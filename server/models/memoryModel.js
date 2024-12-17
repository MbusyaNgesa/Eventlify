import mongoose from "mongoose";

const memorySchema = new mongoose.Schema({
  month: { type: String, required: true },
  image: { type: String },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
});

export const Memory = mongoose.model("Memory", memorySchema);
