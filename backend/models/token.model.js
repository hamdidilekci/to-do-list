import mongoose, { model, Schema } from "mongoose";

const TokenSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600, // this is the expiry time in seconds
    },
  },
  {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
    versionKey: false,
    collection: "token",
  }
);

const Model = model("Token", TokenSchema);

export default Model;
