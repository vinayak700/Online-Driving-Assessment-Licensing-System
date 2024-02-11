/* Module/File Imports */
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import swagger from "swagger-ui-express";
import apiDocs from "./swagger.json" assert { type: "json" };

import connection from "./src/Config/mongoose.js";
import authRouter from "./src/Routes/Auth_Routes.js";
import { verifyToken } from "./src/Middlewares/Auth_Middleware.js";
import userRouter from "./src/Routes/User_Routes.js";
import licenseRouter from "./src/Routes/License_Routes.js";
import testRouter from "./src/Routes/Test_Routes.js";
import {
  errorHandler,
  handleValidationError,
} from "./src/Middlewares/errorHandler_Middleware.js";

// Initilize express app
const app = express();

/* CONFIGURATIONS */
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(
  cors({
    origin: "*",
    methods: "*",
    credentials: true,
  })
);
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

/* SETTING UP LOCAL ROUTES*/
app.use(express.static("public"));
app.use(express.static("public/Licenses"));
app.use(express.static("public/assets"));
app.use(express.static("public/uploads"));

/* API DOCUMENTATION */
app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

/* WELCOME PAGE */
app.get("/", (req, res) => {
  res.status(200).redirect("./welcome.html");
});

/* API ROUTES */
app.use("/auth", authRouter);
app.use("/user", verifyToken, userRouter);
app.use("/test", verifyToken, testRouter);
app.use("/license", licenseRouter);

/* APPLICATION ERROR HANDLERS */
app.use(handleValidationError);
app.use(errorHandler);

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
  connection();
});
