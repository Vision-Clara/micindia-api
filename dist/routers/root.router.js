"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const user_router_1 = __importDefault(require("./user.router"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const rootRouter = (0, express_1.Router)();
rootRouter.post("/signup", user_controller_1.signUp);
rootRouter.post("/signin", user_controller_1.signIn);
rootRouter.post("/signout", user_controller_1.signOut);
rootRouter.use("/profile", auth_middleware_1.default, user_controller_1.getUserProfile);
rootRouter.use("/user", auth_middleware_1.default, user_router_1.default);
exports.default = rootRouter;
