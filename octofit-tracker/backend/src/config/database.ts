import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/octofit_db";

export async function connectDatabase() {
  return mongoose.connect(MONGO_URI);
}

export { mongoose };
export { MONGO_URI };
