import Reminder from "../models/reminder.model.js";

import { BadRequestError } from "../common/errors.js";
import Todo from "../models/todo.model.js";

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

    const _dueReminders = [];

    await Reminder.find({
      reminderDate: { $lte: currentDate },
      isSent: false,
      userId: currentUser._id,
    }).then(async (rm) => {
      for (let i = 0; i < rm.length; i++) {
        const task = await Todo.findById(rm[i].taskId).lean();
        _dueReminders.push({
          ...rm[i]._doc,
          taskTitle: task.title,
        });

        // mark due reminders as sent
        rm[i].isSent = true;
        rm[i].save();
      }
    });

    return _dueReminders;
  }
}
