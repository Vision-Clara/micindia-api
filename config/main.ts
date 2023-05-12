import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";

dotenv.config();

type Config = {
  JWT_SECRET: Secret;
  JWT_EXPIRY: string | number;
  MONGODB_URL?: string;
  PORT?: string;
};

const config: Config = {
  JWT_SECRET: process.env.JWT_SECRET || "Dummy",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "30d",
  MONGODB_URL: process.env.MONGODB_URL,
  PORT: process.env.PORT,
};

export default config;
