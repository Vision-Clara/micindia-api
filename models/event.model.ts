import mongoose from "mongoose";
import { LOCATIONS } from "../utils/helpers";

const EventSchema = new mongoose.Schema({
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
    get: (date: Date) => {
      return date.toLocaleString();
    },
  },
  eventLocation: {
    type: String,
    required: [true, "eventDate is a required field"],
    enum: Object.values(LOCATIONS),
  },
});

const EventModel = mongoose.model("event", EventSchema);
export default EventModel;
