import { Router } from "express";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:userId", getUserById);
userRouter.delete("/:userId", deleteUserById);

export default userRouter;
