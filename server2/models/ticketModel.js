import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  type: { type: String, enum: ["advance", "regular", "vip"], required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const Ticket = mongoose.model("Ticket", ticketSchema);
