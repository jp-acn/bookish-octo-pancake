import { Schema, model, Types } from "mongoose";

export interface IActivity {
  user: Types.ObjectId;
  team: Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    team: { type: Types.ObjectId, ref: "Team", required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, required: true, default: () => new Date() },
  },
  { timestamps: true }
);

export default model<IActivity>("Activity", activitySchema);
