"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    JWT_SECRET: process.env.JWT_SECRET || "Dummy",
    JWT_EXPIRY: process.env.JWT_EXPIRY || "30d",
    MONGODB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT,
    SMTP_SERVICE: process.env.SMTP_SERVICE || "gmail",
    SMTP_MAIL_USERNAME: process.env.SMTP_MAIL_USERNAME,
    SMTP_MAIL_EMAIL: process.env.SMTP_MAIL_EMAIL,
    SMTP_MAIL_PASSWORD: process.env.SMTP_MAIL_PASSWORD,
    FEEDBACK_MAILERS: process.env.FEEDBACK_MAILERS || "dev.micindia@gmail.com",
};
exports.default = config;
