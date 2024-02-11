import mongoose from "mongoose";
const { Schema } = mongoose;

/** Question Schema */
const questionModel = new Schema({
  questions: { type: Array, default: [] },
  answers: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
});

export const Question = mongoose.model("Question", questionModel);
