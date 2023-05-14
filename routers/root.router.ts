import { Router } from "express";
import {
  getUserProfile,
  signIn,
  signOut,
  signUp,
} from "../controllers/user.controller";
import userRouter from "./user.router";
import isLoggedIn from "../middlewares/auth.middleware";
import isAdmin from "../middlewares/admin.middleware";
import { sendFeedback } from "../controllers/feedback.controller";
import eventRouter from "./event.router";

const rootRouter = Router();

rootRouter.post("/signup", signUp);
rootRouter.post("/signin", signIn);
rootRouter.post("/signout", signOut);
rootRouter.post("/feedback", sendFeedback);

// Only User
rootRouter.get("/profile", isLoggedIn, getUserProfile);

// Only ADMIN User
rootRouter.use("/user", isLoggedIn, isAdmin, userRouter);
rootRouter.use("/event", isLoggedIn, isAdmin, eventRouter);

export default rootRouter;
