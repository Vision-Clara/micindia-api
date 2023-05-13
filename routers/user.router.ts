import { Router } from "express";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
} from "../controllers/user.controller";
import isLoggedIn from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:userId", getUserById);
userRouter.delete("/:userId", deleteUserById);

export default userRouter;
