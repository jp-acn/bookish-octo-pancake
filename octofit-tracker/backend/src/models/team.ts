import { Schema, model, Types } from "mongoose";

export interface ITeam {
  name: string;
  description: string;
  members: Types.ObjectId[];
  score: number;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: Types.ObjectId, ref: "User", required: true }],
    score: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export default model<ITeam>("Team", teamSchema);
