import mongoose from "mongoose";
import { GenreEnum } from "./genreEnum.js";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["current", "previous", "approved", "declined", "draft"],
    default: "draft",
  },
  ticketsSold: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 },
  images: [{ type: String }],
  // genre: { type: mongoose.Schema.Types.ObjectId, ref: "Genre", required: true },
  genre: {
    type: String,
    enum: Object.values(GenreEnum), // Use enum values
    required: true,
  },

  hostName: { type: String, required: true },
});

export const Event = mongoose.model("Event", eventSchema);
