import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["organizer", "admin"], default: "organizer" },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
