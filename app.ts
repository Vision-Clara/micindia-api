import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import rootRouter from "./routers/root.router";

const expressApp = express();

expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));
expressApp.use(cookieParser());
expressApp.use(cors());
expressApp.use("/api/v1", rootRouter);

export default expressApp;
