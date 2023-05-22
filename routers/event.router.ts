import express from "express";
import {
  creatEvent,
  deleteEventById,
  getAllEvents,
  getEventById,
  updateEventById,
} from "../controllers/event.controller";
import isLoggedIn from "../middlewares/auth.middleware";
import isAdmin from "../middlewares/admin.middleware";

const eventRouter = express.Router();

eventRouter.get("/", getAllEvents);

// Protected Routes
eventRouter.post("/", isLoggedIn, isAdmin, creatEvent);
eventRouter.get("/:eventId", isLoggedIn, isAdmin, getEventById);
eventRouter.delete("/:eventId", isLoggedIn, isAdmin, deleteEventById);
eventRouter.patch("/:eventId", isLoggedIn, isAdmin, updateEventById);

export default eventRouter;
