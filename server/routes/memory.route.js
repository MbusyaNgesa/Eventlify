import express from "express";
import { allmemories } from "../controller/memory.controller.js";

const router = express.Router();

router.get("/:id", allmemories);

export default router;
