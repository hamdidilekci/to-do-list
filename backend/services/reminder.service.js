import Reminder from "../models/reminder.model.js";

import { BadRequestError, NotFoundError } from "../common/errors.js";

export default class ReminderService {
  static async create(currentUser, { taskId, reminderDate }) {
    if (!taskId || !reminderDate) {
      throw new BadRequestError(
        "Task ID and reminder date are required when creating a reminder"
      );
    }
    const dt = new Date(reminderDate);
    dt.setHours(dt.getHours() + 3);

    // create new reminder
    const reminder = new Reminder({
      userId: currentUser._id,
      taskId,
      reminderDate: dt,
    });

    await reminder.save();

    return reminder;
  }

  static async find(currentUser) {
    const currentDate = new Date(Date.now());
    currentDate.setHours(currentDate.getHours() + 3);

    const dueReminders = await Reminder.find({
      reminderDate: { $lte: currentDate },
      isSent: false,
      userId: currentUser._id,
    });

    // TODO: mark due reminders as sent
    dueReminders.forEach((dueReminder) => {
      dueReminder.isSent = true;
      dueReminder.save();
    });

    return dueReminders;
  }
}
