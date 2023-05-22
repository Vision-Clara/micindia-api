"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const event_controller_1 = require("../controllers/event.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const admin_middleware_1 = __importDefault(require("../middlewares/admin.middleware"));
const eventRouter = express_1.default.Router();
eventRouter.get("/", event_controller_1.getAllEvents);
// Protected Routes
eventRouter.post("/", auth_middleware_1.default, admin_middleware_1.default, event_controller_1.creatEvent);
eventRouter.get("/:eventId", auth_middleware_1.default, admin_middleware_1.default, event_controller_1.getEventById);
eventRouter.delete("/:eventId", auth_middleware_1.default, admin_middleware_1.default, event_controller_1.deleteEventById);
eventRouter.patch("/:eventId", auth_middleware_1.default, admin_middleware_1.default, event_controller_1.updateEventById);
exports.default = eventRouter;
