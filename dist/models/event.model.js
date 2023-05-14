"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const helpers_1 = require("../utils/helpers");
const EventSchema = new mongoose_1.default.Schema({
    eventName: {
        type: String,
        required: [true, "evenName is a required field"],
    },
    eventDesc: {
        type: String,
        required: [true, "eventDesc is a required field"],
    },
    eventPoster: {
        type: String,
        required: [true, "eventPoster is a required field"],
    },
    eventDate: {
        type: Date,
        required: [true, "eventDate is a required field"],
        get: (date) => {
            return date.toLocaleString();
        },
    },
    eventLocation: {
        type: String,
        required: [true, "eventDate is a required field"],
        enum: Object.values(helpers_1.LOCATIONS),
    },
});
const EventModel = mongoose_1.default.model("event", EventSchema);
exports.default = EventModel;
