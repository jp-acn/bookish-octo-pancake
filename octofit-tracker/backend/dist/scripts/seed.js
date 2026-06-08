"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const models_1 = require("../models");
// Seed the octofit_db database with test data
async function clearData() {
    await Promise.all([
        models_1.Activity.deleteMany({}),
        models_1.Leaderboard.deleteMany({}),
        models_1.Team.deleteMany({}),
        models_1.User.deleteMany({}),
        models_1.Workout.deleteMany({}),
    ]);
}
async function seed() {
    try {
        console.log("Connecting to MongoDB:", database_1.MONGO_URI);
        await (0, database_1.connectDatabase)();
        console.log("Seed the octofit_db database with test data");
        await clearData();
        const teams = await models_1.Team.create([
            {
                name: "Trail Blazers",
                description: "A high-energy team focused on outdoor endurance and team challenges.",
                members: [],
                score: 1240,
            },
            {
                name: "Core Crushers",
                description: "Strength training and core development team for daily workouts.",
                members: [],
                score: 980,
            },
        ]);
        const users = await models_1.User.create([
            {
                name: "Ariana Wells",
                email: "ariana.wells@example.com",
                role: "captain",
                team: teams[0]._id,
                joinedAt: new Date("2026-01-12"),
            },
            {
                name: "Miles Cooper",
                email: "miles.cooper@example.com",
                role: "member",
                team: teams[0]._id,
                joinedAt: new Date("2026-02-08"),
            },
            {
                name: "Leah Kim",
                email: "leah.kim@example.com",
                role: "member",
                team: teams[1]._id,
                joinedAt: new Date("2026-03-22"),
            },
        ]);
        teams[0].members = [users[0]._id, users[1]._id];
        teams[1].members = [users[2]._id];
        await Promise.all(teams.map((team) => team.save()));
        await models_1.Activity.create([
            {
                user: users[0]._id,
                team: teams[0]._id,
                type: "Running",
                durationMinutes: 45,
                caloriesBurned: 520,
                date: new Date("2026-06-03T07:45:00Z"),
            },
            {
                user: users[1]._id,
                team: teams[0]._id,
                type: "Cycling",
                durationMinutes: 60,
                caloriesBurned: 680,
                date: new Date("2026-06-04T09:30:00Z"),
            },
            {
                user: users[2]._id,
                team: teams[1]._id,
                type: "HIIT",
                durationMinutes: 35,
                caloriesBurned: 410,
                date: new Date("2026-06-04T18:15:00Z"),
            },
        ]);
        await models_1.Leaderboard.create([
            {
                team: teams[0]._id,
                teamName: teams[0].name,
                rank: 1,
                score: teams[0].score,
                updatedAt: new Date(),
            },
            {
                team: teams[1]._id,
                teamName: teams[1].name,
                rank: 2,
                score: teams[1].score,
                updatedAt: new Date(),
            },
        ]);
        await models_1.Workout.create([
            {
                name: "Sunrise Interval Run",
                description: "A morning run with pacing intervals and a cooldown stretch.",
                durationMinutes: 30,
                caloriesBurned: 320,
                level: "Intermediate",
                focus: "Endurance",
            },
            {
                name: "Strength Circuit",
                description: "Full-body circuit focused on strength, core, and mobility.",
                durationMinutes: 40,
                caloriesBurned: 410,
                level: "Advanced",
                focus: "Strength",
            },
            {
                name: "Recovery Flow",
                description: "Low-impact recovery workout with stretching and light movement.",
                durationMinutes: 25,
                caloriesBurned: 180,
                level: "Beginner",
                focus: "Flexibility",
            },
        ]);
        console.log("Seed data inserted for users, teams, activities, leaderboard, and workouts.");
    }
    catch (error) {
        console.error("Seed failed:", error);
        process.exit(1);
    }
    finally {
        await database_1.mongoose.disconnect();
        process.exit(0);
    }
}
seed();
