import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";

dotenv.config();

type Config = {
  JWT_SECRET: Secret;
  JWT_EXPIRY: string | number;
  MONGODB_URL?: string;
  PORT?: string;
  SMTP_SERVICE: string;
  SMTP_MAIL_USERNAME?: string;
  SMTP_MAIL_EMAIL?: string;
  SMTP_MAIL_PASSWORD?: string;
  FEEDBACK_MAILERS: string;
};

const config: Config = {
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

export default config;
