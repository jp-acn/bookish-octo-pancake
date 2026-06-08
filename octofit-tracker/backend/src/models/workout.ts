import { Schema, model } from "mongoose";

export interface IWorkout {
  name: string;
  description: string;
  durationMinutes: number;
  caloriesBurned: number;
  level: string;
  focus: string;
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    level: { type: String, required: true },
    focus: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IWorkout>("Workout", workoutSchema);
