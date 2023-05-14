import express from "express";
import {
  creatEvent,
  deleteEventById,
  getAllEvents,
  getEventById,
  updateEventById,
} from "../controllers/event.controller";

const eventRouter = express.Router();

eventRouter.post("/", creatEvent);
eventRouter.get("/", getAllEvents);
eventRouter.get("/:eventId", getEventById);
eventRouter.delete("/:eventId", deleteEventById);
eventRouter.patch("/:eventId", updateEventById);

export default eventRouter;
