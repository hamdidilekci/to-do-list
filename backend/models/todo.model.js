import mongoose, { model, Schema } from "mongoose";

// Todo Schema
const TodoSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    priority: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      default: null,
    },
    completed: {
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
    collection: "todo",
  }
);

const Model = model("Todo", TodoSchema);

export default Model;
