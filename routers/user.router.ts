import { Router } from "express";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:userId", getUserById);
userRouter.delete("/:userId", deleteUserById);
userRouter.patch("/:userId", updateUserById);

export default userRouter;
