import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller";
import isLoggedIn from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.get("/", isLoggedIn, getAllUsers);

export default userRouter;
