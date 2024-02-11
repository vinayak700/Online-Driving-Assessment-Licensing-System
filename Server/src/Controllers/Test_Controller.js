import { Question } from "../Models/Question_Model.js";
import { Result } from "../Models/Result_Model.js";
import questions, { answers } from "../../public/questions.js";
import { ObjectId } from "mongodb";

export default class TestController {
  /* Fetching Assessment Questions*/
  getQuestions = async (req, res) => {
    try {
      const questions = await Question.find();
      res.status(200).json(questions);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  /* Insert all questinos */
  insertQuestions = async (req, res) => {
    try {
      await Question.insertMany({ questions, answers });
      res.json({ msg: "Data Saved Successfully...!" });
    } catch (error) {
      res.json({ error });
    }
  };

  /* Delete all Questions */
  dropQuestions = async (req, res) => {
    try {
      await Question.deleteMany();
      res.json({ msg: "Questions Deleted Successfully...!" });
    } catch (error) {
      res.json({ error });
    }
  };

  /* Saving a Result for a Specific User*/
  submitResult = async (req, res) => {
    const { userId } = req.params;
    try {
      const { username, result, attempts, score, achieved } = req.body;
      if (!username && !result)
        return res.status(400).json({ message: "Date not provided..." });
      console.log(req.body);
      const newResult = await Result({
        userId,
        username,
        result,
        attempts,
        score,
        achieved,
      });
      await newResult.save();
      res.status(201).json({ message: "Result saved successfully!!!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  /* Fetching User Results */
  getResults = async (req, res) => {
    const { userId } = req.params;
    try {
      const results = await Result.find({ userId: userId });
      console.log(results, userId);
      res.status(200).json(results);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  /* Deleting User Results*/
  deleteResults = async (req, res) => {
    const { userId } = req.params;
    try {
      await Result.deleteMany({ userId });
      res.json({ msg: "Results deleted Successfully!!!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}
