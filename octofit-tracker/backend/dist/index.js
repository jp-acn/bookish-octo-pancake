"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const models_1 = require("./models");
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const CODESPACE_API_HOST = CODESPACE_NAME
    ? `${CODESPACE_NAME}-8000.githubpreview.dev`
    : null;
const API_BASE_URL = CODESPACE_API_HOST
    ? `https://${CODESPACE_API_HOST}/api`
    : `http://localhost:${PORT}/api`;
const app = (0, express_1.default)();
app.use(express_1.default.json());
const apiRouter = express_1.default.Router();
apiRouter.get("/users", async (_req, res) => {
    const users = await models_1.User.find().populate("team", "name").lean();
    res.json({ message: "List of users", data: users });
});
apiRouter.get("/teams", async (_req, res) => {
    const teams = await models_1.Team.find().populate("members", "name email role").lean();
    res.json({ message: "List of teams", data: teams });
});
apiRouter.get("/activities", async (_req, res) => {
    const activities = await models_1.Activity.find()
        .populate("user", "name email")
        .populate("team", "name")
        .lean();
    res.json({ message: "List of activities", data: activities });
});
apiRouter.get("/leaderboard", async (_req, res) => {
    const entries = await models_1.Leaderboard.find().sort({ rank: 1 }).lean();
    res.json({ message: "Leaderboard data", entries });
});
apiRouter.get("/workouts", async (_req, res) => {
    const workouts = await models_1.Workout.find().lean();
    res.json({ message: "List of workouts", data: workouts });
});
app.use("/api", apiRouter);
app.get("/", (_req, res) => {
    res.json({
        status: "ok",
        service: "octofit-backend",
        apiUrl: API_BASE_URL,
    });
});
app.all(/^\/api\/.*$/, (_req, res) => {
    res.status(404).json({
        error: "API route not found",
    });
});
async function start() {
    try {
        await (0, database_1.connectDatabase)();
        console.log("Connected to MongoDB", database_1.MONGO_URI);
        app.listen(PORT, () => {
            const host = CODESPACE_API_HOST ? CODESPACE_API_HOST : `localhost:${PORT}`;
            console.log(`Server listening on http://${host}`);
            console.log(`API base URL: ${API_BASE_URL}`);
        });
    }
    catch (err) {
        console.error("Failed to start server", err);
        process.exit(1);
    }
}
start();
