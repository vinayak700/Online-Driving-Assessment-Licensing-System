import express from "express";
import TestController from "../Controllers/Test_Controller.js";

const testController = new TestController();

const testRouter = express.Router();

/* Test API ROUTES */
testRouter.get("/questions", testController.getQuestions);
testRouter.post("/result/:userId", testController.submitResult);
testRouter.post("/questions", testController.insertQuestions);
testRouter.delete("/questions", testController.dropQuestions);
testRouter.get("/result/:userId", testController.getResults);
testRouter.delete("/result/:userId", testController.deleteResults);

export default testRouter;
