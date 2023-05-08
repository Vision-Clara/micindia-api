"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const helpers_1 = require("../utils/helpers");
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        lowercase: true,
        required: [true, "UserName Required"],
        match: [/^[a-zA-Z\s]+$/, "Invalid Username"],
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "Email Required"],
        match: [/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Invalid Email"],
    },
    password: {
        type: String,
        required: [true, "Password Required"],
    },
    role: {
        type: String,
        enum: helpers_1.AUTH_ROLES,
        default: "NEW_USER",
    },
}, {
    timestamps: true,
});
const UserModel = mongoose_1.default.model("user", UserSchema);
exports.default = UserModel;
