import { Schema, model, Types } from "mongoose";

export interface ILeaderboardEntry {
  team: Types.ObjectId;
  teamName: string;
  rank: number;
  score: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    team: { type: Types.ObjectId, ref: "Team", required: true },
    teamName: { type: String, required: true },
    rank: { type: Number, required: true },
    score: { type: Number, required: true },
    updatedAt: { type: Date, required: true, default: () => new Date() },
  },
  { timestamps: true }
);

export default model<ILeaderboardEntry>("Leaderboard", leaderboardSchema);
