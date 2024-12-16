import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
});

export const Genre = mongoose.model("Genre", genreSchema);
