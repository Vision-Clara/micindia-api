"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventById = exports.deleteEventById = exports.getEventById = exports.getAllEvents = exports.creatEvent = void 0;
const helpers_1 = require("../utils/helpers");
const event_model_1 = __importDefault(require("../models/event.model"));
/******************************************************
 * @CREATE_EVENT
 * @route http://localhost:4000/api/v1/event
 * @description Controller to create an event
 * @parameters eventName, eventDesc, eventLocation
 * @returns New event details
 ******************************************************/
const creatEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventName, eventDesc, eventPoster, eventDate, eventLocation } = req.body;
        if (!eventName ||
            !eventDesc ||
            !eventPoster ||
            !eventDate ||
            !eventLocation) {
            throw new helpers_1.CustomError("Please fill all details", 400);
        }
        const newEvent = yield event_model_1.default.create({
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
    }
    catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({
            success: false,
            code: error.code || "UNKOWN",
            message: error.message || "Something Went Wrong",
        });
    }
});
exports.creatEvent = creatEvent;
/******************************************************
 * @GET_ALL_EVENT
 * @route http://localhost:4000/api/v1/event
 * @description Controller to fetch all events details
 * @parameters NA
 * @returns Event details
 ******************************************************/
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allEvents = yield event_model_1.default.find();
        res.status(200).json({
            success: true,
            message: "Events Fetched Successfully",
            events: allEvents,
        });
    }
    catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({
            success: false,
            code: error.code || "UNKOWN",
            message: error.message || "Something Went Wrong",
        });
    }
});
exports.getAllEvents = getAllEvents;
/******************************************************
 * @GET_EVENT_BY_ID
 * @route http://localhost:4000/api/v1/event/:eventId
 * @description Controller to fetch an event details
 * @parameters eventId
 * @returns Event details
 ******************************************************/
const getEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = req.params;
        const event = yield event_model_1.default.findById(eventId);
        if (!event) {
            throw new helpers_1.CustomError("Event Not Found", 400);
        }
        res.status(200).json({
            success: true,
            message: "Event Fetched Successfully",
            event: event,
        });
    }
    catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({
            success: false,
            code: error.code || "UNKOWN",
            message: error.message || "Something Went Wrong",
        });
    }
});
exports.getEventById = getEventById;
/******************************************************
 * @DEL_EVENT_BY_ID
 * @route http://localhost:4000/api/v1/event/:eventId
 * @description Controller to delete an event
 * @parameters eventId
 * @returns Deleted event details
 ******************************************************/
const deleteEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = req.params;
        const event = yield event_model_1.default.findById(eventId);
        if (!event) {
            throw new helpers_1.CustomError("Event Not Found", 400);
        }
        const deletedEvent = yield event_model_1.default.findByIdAndDelete(eventId);
        res.status(200).json({
            success: true,
            message: "Event Deleted Successfully",
            event: deletedEvent,
        });
    }
    catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({
            success: false,
            code: error.code || "UNKOWN",
            message: error.message || "Something Went Wrong",
        });
    }
});
exports.deleteEventById = deleteEventById;
/******************************************************
 * @UPDATE_EVENT_BY_ID
 * @route http://localhost:4000/api/v1/event/:eventId
 * @description Controller to update an event
 * @parameters eventId
 * @returns Updated event details
 ******************************************************/
const updateEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = req.params;
        const { eventName, eventDesc, eventPoster, eventDate, eventLocation } = req.body;
        const event = yield event_model_1.default.findById(eventId);
        if (!event) {
            throw new helpers_1.CustomError("Event Not Found", 400);
        }
        const updatedEvent = yield event_model_1.default.findByIdAndUpdate(eventId, {
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
    }
    catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({
            success: false,
            code: error.code || "UNKOWN",
            message: error.message || "Something Went Wrong",
        });
    }
});
exports.updateEventById = updateEventById;
