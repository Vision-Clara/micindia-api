"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const user_router_1 = __importDefault(require("./user.router"));
const rootRouter = (0, express_1.Router)();
rootRouter.post("/signup", user_controller_1.signUp);
rootRouter.post("/signin", user_controller_1.signIn);
rootRouter.post("/signout", user_controller_1.signOut);
rootRouter.use("/user", user_router_1.default);
exports.default = rootRouter;
