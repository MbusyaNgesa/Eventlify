import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please add a name"],
//   },
//   email: {
//     type: String,
//     required: [true, "Please add an email"],
//     unique: true,
//     match: [
//       /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//       "Please add a valid email",
//     ],
//   },
//   password: {
//     type: String,
//     required: [true, "Please add a password"],
//     minlength: 6,
//     select: false,
//   },
//   role: {
//     type: String,
//     enum: ["user", "organizer", "admin"],
//     default: "user",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }

//   const salt = await bcryptjs.genSalt(10);
//   this.password = await bcryptjs.hash(this.password, salt);
// });

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcryptjs.compare(enteredPassword, this.password);
// };

// export const User = mongoose.model("User", userSchema);

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
