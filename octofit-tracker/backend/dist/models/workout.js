"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    level: { type: String, required: true },
    focus: { type: String, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Workout", workoutSchema);
