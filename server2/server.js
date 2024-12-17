import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import { connectDB } from "./db/connectDB.js";
import { protect } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api", protect);

app.listen(PORT, () => {
  connectDB();
  console.log("Server Running");
});
