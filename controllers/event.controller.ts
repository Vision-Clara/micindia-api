import { Request, Response } from "express";
import { CustomError } from "../utils/helpers";
import EventModel from "../models/event.model";

/******************************************************
 * @CREATE_EVENT
 * @route http://localhost:4000/api/v1/event
 * @description Controller to create an event
 * @parameters eventName, eventDesc, eventLocation
 * @returns New event details
 ******************************************************/
export const creatEvent = async (req: Request, res: Response) => {
  try {
    const { eventName, eventDesc, eventPoster, eventDate, eventLocation } =
      req.body;

    if (
      !eventName ||
      !eventDesc ||
      !eventPoster ||
      !eventDate ||
      !eventLocation
    ) {
      throw new CustomError("Please fill all details", 400);
    }

    const newEvent = await EventModel.create({
      eventName,
      eventDesc,
      eventPoster,
      eventDate,
      eventLocation,
    });

    res.status(200).json({
      success: true,
      message: "Event Created Successfully",
      event: newEvent,
    });
  } catch (error: any) {
    console.log(error);

    res.status(error.statusCode || 500).json({
      success: false,
      code: error.code || "UNKOWN",
      message: error.message || "Something Went Wrong",
    });
  }
};

/******************************************************
 * @GET_ALL_EVENT
 * @route http://localhost:4000/api/v1/event
 * @description Controller to fetch all events details
 * @parameters NA
 * @returns Event details
 ******************************************************/
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const allEvents = await EventModel.find();

    res.status(200).json({
      success: true,
      message: "Events Fetched Successfully",
      events: allEvents,
    });
  } catch (error: any) {
    console.log(error);

    res.status(error.statusCode || 500).json({
      success: false,
      code: error.code || "UNKOWN",
      message: error.message || "Something Went Wrong",
    });
  }
};

/******************************************************
 * @GET_EVENT_BY_ID
 * @route http://localhost:4000/api/v1/event/:eventId
 * @description Controller to fetch an event details
 * @parameters eventId
 * @returns Event details
 ******************************************************/
export const getEventById = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    const event = await EventModel.findById(eventId);

    if (!event) {
      throw new CustomError("Event Not Found", 400);
    }

    res.status(200).json({
      success: true,
      message: "Event Fetched Successfully",
      event: event,
    });
  } catch (error: any) {
    console.log(error);

    res.status(error.statusCode || 500).json({
      success: false,
      code: error.code || "UNKOWN",
      message: error.message || "Something Went Wrong",
    });
  }
};

/******************************************************
 * @DEL_EVENT_BY_ID
 * @route http://localhost:4000/api/v1/event/:eventId
 * @description Controller to delete an event
 * @parameters eventId
 * @returns Deleted event details
 ******************************************************/
export const deleteEventById = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    const event = await EventModel.findById(eventId);

    if (!event) {
      throw new CustomError("Event Not Found", 400);
    }

    const deletedEvent = await EventModel.findByIdAndDelete(eventId);

    res.status(200).json({
      success: true,
      message: "Event Deleted Successfully",
      event: deletedEvent,
    });
  } catch (error: any) {
    console.log(error);

    res.status(error.statusCode || 500).json({
      success: false,
      code: error.code || "UNKOWN",
      message: error.message || "Something Went Wrong",
    });
  }
};

/******************************************************
 * @UPDATE_EVENT_BY_ID
 * @route http://localhost:4000/api/v1/event/:eventId
 * @description Controller to update an event
 * @parameters eventId
 * @returns Updated event details
 ******************************************************/
export const updateEventById = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const { eventName, eventDesc, eventPoster, eventDate, eventLocation } =
      req.body;

    const event = await EventModel.findById(eventId);

    if (!event) {
      throw new CustomError("Event Not Found", 400);
    }

    const updatedEvent = await EventModel.findByIdAndUpdate(eventId, {
      eventName,
      eventDesc,
      eventPoster,
      eventDate,
      eventLocation,
    });

    res.status(200).json({
      success: true,
      message: "Event Updated Successfully",
      event: updatedEvent,
    });
  } catch (error: any) {
    console.log(error);

    res.status(error.statusCode || 500).json({
      success: false,
      code: error.code || "UNKOWN",
      message: error.message || "Something Went Wrong",
    });
  }
};
