import mongoose, { model, Schema } from "mongoose";

// Reminder Schema
const ReminderSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    taskId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    reminderDate: {
      type: Date,
      required: true,
    },
    isSent: {
      type: Boolean,
      default: false,
    },
    createdAt: Date,
    updatedAt: Date,
  },
  {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
    versionKey: false,
    collection: "reminder",
  }
);

const Model = model("Reminder", ReminderSchema);

export default Model;
