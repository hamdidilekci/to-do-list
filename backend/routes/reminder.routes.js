import express from "express";
import { body, validationResult } from "express-validator";

import ReminderService from "../services/reminder.service.js";

import handleError from "../middleware/handle-error.js";

const router = express.Router();

// create a reminder
router.post(
  "/",
  [
    // Add validation for reminderDate
    body("reminderDate")
      .isISO8601()
      .withMessage(
        "Reminder date must be a valid ISO8601 date and in the future."
      ),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const reminder = await ReminderService.create(req.user, req.body);
      res.send(reminder);
    } catch (error) {
      handleError(error, req, res);
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const reminders = await ReminderService.find(req.user);
    res.send(reminders);
  } catch (error) {
    handleError(error, req, res);
  }
});

export default router;
