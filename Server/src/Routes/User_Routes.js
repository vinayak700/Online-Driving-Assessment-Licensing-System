import express from "express";
import { upload } from "../Config/FileUpload.js";
import UserController from "../Controllers/User_Controller.js";

const userController = new UserController();

// Initialize express Router instance
const userRouter = express.Router();


// Auth API Endpoints
userRouter.post(
  "/update/:userId",
  upload.fields([
    { name: "picture", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
  ]),
  userController.updateUser
);
userRouter.delete("/delete/:userId", userController.deleteUser);

export default userRouter;
