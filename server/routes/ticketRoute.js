import express from "express";
import { body, validationResult } from "express-validator";

import { authorize, protect } from "../middleware/authMiddleware.js";
import { Event } from "../models/eventModel.js";
import { Ticket } from "../models/ticketModel.js";

const router = express.Router();

//Creating a Ticket
router.post(
  "/",

  protect,
  authorize("organizer", "admin"),
  [
    body("eventId").isMongoId().withMessage("Valid event ID is required"),
    body("type")
      .isIn(["advance", "regular", "vip"])
      .withMessage("Valid ticket type is required"),
    body("price").isNumeric().withMessage("Valid price is required"),
    body("quantity")
      .isInt({ min: 1 })
      .withMessage("Valid quantity is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const event = await Event.findById(req.body.eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      //   if (event.organizer.toString() !== req.user.id) {
      //     if (req.user.role !== "admin") {
      //       return res
      //         .status(403)
      //         .json({
      //           message: "Not authorized to create tickets for this event",
      //         });
      //     }
      //   }

      if (!event.organizer || event.organizer.toString() !== req.user.id) {
        if (req.user.role !== "admin") {
          return res.status(403).json({
            message: "Not authorized to create tickets for this event",
          });
        }
      }

      const ticket = new Ticket(req.body);
      await ticket.save();
      res.status(201).json(ticket);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Get tickets for an event
router.get("/event/:eventId", async (req, res) => {
  try {
    const tickets = await Ticket.find({ eventId: req.params.eventId });
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Purchase tickets
router.post(
  "/purchase",
  protect,
  [
    body("eventId").isMongoId().withMessage("Valid event ID is required"),
    body("ticketType")
      .isIn(["advance", "regular", "vip"])
      .withMessage("Valid ticket type is required"),
    body("quantity")
      .isInt({ min: 1 })
      .withMessage("Valid quantity is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { eventId, ticketType, quantity } = req.body;
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      const ticket = await Ticket.findOne({
        eventId: eventId,
        type: ticketType,
      });
      //|| ticket.quantity < quantity
      if (!ticket) {
        return res.status(400).json({ message: "Ticket type not found" });
      }
      console.log("Ticket Quantity:", ticket.quantity);
      console.log("Requested Quantity:", quantity);

      if (ticket.quantity < quantity) {
        return res
          .status(400)
          .json({ message: "Not enough tickets available" });
      }

      ticket.quantity -= quantity;
      console.log("Updated ticket quantity", ticket.quantity);

      await ticket.save();

      // Update the event using findByIdAndUpdate to ensure all fields are preserved
      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        {
          $inc: {
            ticketsSold: quantity,
            revenue: ticket.price * quantity,
          },
        },
        { new: true, runValidators: true }
      );

      if (!updatedEvent) {
        throw new Error("Failed to update event");
      }

      // event.ticketsSold += quantity;
      // event.revenue += ticket.price * quantity;

      // await event.save();

      res.json({ message: "Tickets purchased successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
