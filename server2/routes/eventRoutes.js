import express from "express";
import { body, validationResult } from "express-validator";

import { authorize, protect } from "../middleware/authMiddleware.js";
import { Event } from "../models/eventModel.js";
import { Genre } from "../models/genreModel.js";
import { GenreEnum } from "../models/genreEnum.js";

const router = express.Router();

//Listing Event
router.post(
  "/",
  protect,
  (req, res, next) => {
    console.log("User data in request:", req.user);
    next();
  },
  authorize("organizer", "admin"),
  [
    body("name").notEmpty().withMessage("Event name is required"),
    body("date").isISO8601().toDate().withMessage("Valid date is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("genre")
      .isIn(Object.values(GenreEnum)) // Check if genre is one of the enum values
      .withMessage("Valid genre is required"),
    body("hostName").notEmpty().withMessage("Host name is required"),
  ],
  async (req, res) => {
    // console.log(req.user); // Log user data to verify it's populated correctly

    // console.log("User ID:", req.user.id);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      console.log("Creating event with organizer:", req.user.id);

      const event = new Event({
        ...req.body,
        organizer: req.user.id,
      });
      await event.save();
      res.status(201).json(event);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

//Getting event by name
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("genre", "name");
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//Getting Event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("genre", "name");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//Updating the event by ID
router.put(
  "/:id",
  protect,
  authorize("organizer", "admin"),
  async (req, res) => {
    try {
      let event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      // Check if event.organizer exists and is an ObjectId before calling toString
      if (!event.organizer || event.organizer.toString() !== req.user.id) {
        if (req.user.role !== "admin") {
          return res
            .status(403)
            .json({ message: "Not authorized to update this event" });
        }
      }

      event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.json(event);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.delete(
  "/:id",
  protect,
  authorize("organizer", "admin"),
  async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      // Check if event.organizer exists and is an ObjectId before calling toString
      if (!event.organizer || event.organizer.toString() !== req.user.id) {
        if (req.user.role !== "admin") {
          return res
            .status(403)
            .json({ message: "Not authorized to delete this event" });
        }
      }

      await event.remove();
      res.json({ message: "Event removed" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
