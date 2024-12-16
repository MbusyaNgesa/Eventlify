import dotenv from "dotenv";
import express from "express";

import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./db/connectDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server Running");
});
