"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const user_router_1 = __importDefault(require("./user.router"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const admin_middleware_1 = __importDefault(require("../middlewares/admin.middleware"));
const feedback_controller_1 = require("../controllers/feedback.controller");
const event_router_1 = __importDefault(require("./event.router"));
const contact_controller_1 = require("../controllers/contact.controller");
const rootRouter = (0, express_1.Router)();
rootRouter.post("/signup", user_controller_1.signUp);
rootRouter.post("/signin", user_controller_1.signIn);
rootRouter.post("/signout", user_controller_1.signOut);
rootRouter.post("/feedback", feedback_controller_1.sendFeedback);
rootRouter.post("/contact", contact_controller_1.sendMessage);
// Only User
rootRouter.get("/profile", auth_middleware_1.default, user_controller_1.getUserProfile);
// Only ADMIN User
rootRouter.use("/user", auth_middleware_1.default, admin_middleware_1.default, user_router_1.default);
rootRouter.use("/event", auth_middleware_1.default, admin_middleware_1.default, event_router_1.default);
exports.default = rootRouter;
