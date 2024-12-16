import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/connectDB.js";
import authroutes from "./routes/auth.route.js";
import memoriesroute from "./routes/memory.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("Eventlify");
// });

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authroutes);
app.use("/api/memories", memoriesroute);

app.listen(PORT, () => {
  connectDB();
  console.log("Server Running");
});
