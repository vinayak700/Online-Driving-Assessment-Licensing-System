import express from "express";
import AuthController from "../Controllers/Auth_Controller.js";
import { upload } from "../Config/FileUpload.js";

const authController = new AuthController();

// Initialize express Router instance
const authRouter = express.Router();

// Auth API Endpoints
authRouter.post("/register", upload.single("picture"), authController.register);
authRouter.post("/login", authController.login);

export default authRouter;
