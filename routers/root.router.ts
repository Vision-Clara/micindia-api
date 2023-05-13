import { Router } from "express";
import {
  getUserProfile,
  signIn,
  signOut,
  signUp,
} from "../controllers/user.controller";
import userRouter from "./user.router";
import isLoggedIn from "../middlewares/auth.middleware";

const rootRouter = Router();

rootRouter.post("/signup", signUp);
rootRouter.post("/signin", signIn);
rootRouter.post("/signout", signOut);
rootRouter.use("/profile", isLoggedIn, getUserProfile);
rootRouter.use("/user", isLoggedIn, userRouter);

export default rootRouter;
