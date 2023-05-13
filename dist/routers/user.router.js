"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const userRouter = (0, express_1.Router)();
userRouter.get("/", auth_middleware_1.default, user_controller_1.getAllUsers);
userRouter.get("/:userId", auth_middleware_1.default, user_controller_1.getUserById);
userRouter.delete("/:userId", auth_middleware_1.default, user_controller_1.deleteUserById);
exports.default = userRouter;
