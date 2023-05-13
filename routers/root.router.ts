import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/user.controller";
import userRouter from "./user.router";

const rootRouter = Router();

rootRouter.post("/signup", signUp);
rootRouter.post("/signin", signIn);
rootRouter.post("/signout", signOut);
rootRouter.use("/user", userRouter);

export default rootRouter;
