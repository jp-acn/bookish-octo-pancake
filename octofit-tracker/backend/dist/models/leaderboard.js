"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    team: { type: mongoose_1.Types.ObjectId, ref: "Team", required: true },
    teamName: { type: String, required: true },
    rank: { type: Number, required: true },
    score: { type: Number, required: true },
    updatedAt: { type: Date, required: true, default: () => new Date() },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Leaderboard", leaderboardSchema);
