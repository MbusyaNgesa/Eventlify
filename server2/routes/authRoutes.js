import express from "express";
import { login } from "../controllers/loginController.js";

const router = express.Router();

router.get("/login", login);

export default router;