"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI = exports.mongoose = void 0;
exports.connectDatabase = connectDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/octofit_db";
exports.MONGO_URI = MONGO_URI;
async function connectDatabase() {
    return mongoose_1.default.connect(MONGO_URI);
}
