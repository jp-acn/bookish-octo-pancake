import express from "express";
import { connectDatabase, MONGO_URI } from "./config/database";
import { Activity, Leaderboard, Team, User, Workout } from "./models";

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const CODESPACE_API_HOST = CODESPACE_NAME
  ? `${CODESPACE_NAME}-8000.app.github.dev`
  : null;
const API_BASE_URL = CODESPACE_API_HOST
  ? `https://${CODESPACE_API_HOST}/api`
  : `http://localhost:${PORT}/api`;

const app = express();
app.use(express.json());

const apiRouter = express.Router();

apiRouter.get("/users", async (_req, res) => {
  const users = await User.find().populate("team", "name").lean();
  res.json({ message: "List of users", data: users });
});

apiRouter.get("/teams", async (_req, res) => {
  const teams = await Team.find().populate("members", "name email role").lean();
  res.json({ message: "List of teams", data: teams });
});

apiRouter.get("/activities", async (_req, res) => {
  const activities = await Activity.find()
    .populate("user", "name email")
    .populate("team", "name")
    .lean();
  res.json({ message: "List of activities", data: activities });
});

apiRouter.get("/leaderboard", async (_req, res) => {
  const entries = await Leaderboard.find().sort({ rank: 1 }).lean();
  res.json({ message: "Leaderboard data", entries });
});

apiRouter.get("/workouts", async (_req, res) => {
  const workouts = await Workout.find().lean();
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

export async function start() {
  try {
    await connectDatabase();
    console.log("Connected to MongoDB", MONGO_URI);

    app.listen(PORT, () => {
      const host = CODESPACE_API_HOST
        ? `https://${CODESPACE_API_HOST}`
        : `http://localhost:${PORT}`;
      console.log(`Server listening on ${host}`);
      console.log(`API base URL: ${API_BASE_URL}`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
}
