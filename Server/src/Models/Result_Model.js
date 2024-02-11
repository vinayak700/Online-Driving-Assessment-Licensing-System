import mongoose from "mongoose";
const { Schema } = mongoose;

/** Result Schema */
const resultModel = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String },
  result: { type: Array, default: [] },
  attempts: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  achieved: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

export const Result = mongoose.model("result", resultModel);
