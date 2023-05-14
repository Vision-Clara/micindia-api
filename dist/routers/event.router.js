"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const event_controller_1 = require("../controllers/event.controller");
const eventRouter = express_1.default.Router();
eventRouter.post("/", event_controller_1.creatEvent);
eventRouter.get("/", event_controller_1.getAllEvents);
eventRouter.get("/:eventId", event_controller_1.getEventById);
eventRouter.delete("/:eventId", event_controller_1.deleteEventById);
eventRouter.patch("/:eventId", event_controller_1.updateEventById);
exports.default = eventRouter;
