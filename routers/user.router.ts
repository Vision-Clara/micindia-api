import { Router } from "express";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
} from "../controllers/user.controller";
import isLoggedIn from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.get("/", isLoggedIn, getAllUsers);
userRouter.get("/:userId", isLoggedIn, getUserById);
userRouter.delete("/:userId", isLoggedIn, deleteUserById);

export default userRouter;
