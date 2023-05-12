"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const rootRouter = (0, express_1.Router)();
rootRouter.post("/signup", user_1.signUp);
rootRouter.post("/signin", user_1.signIn);
rootRouter.post("/signout", user_1.signOut);
exports.default = rootRouter;
