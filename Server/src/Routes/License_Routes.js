import express from "express";
import LicenseController from "../Controllers/License_Controller.js";

const licenseController = new LicenseController();

const licenseRouter = express.Router();

licenseRouter.post("/:userId", licenseController.issueLicense);
licenseRouter.get("/:userId", licenseController.getUserLicense);
licenseRouter.get("/licenseView/:userId", licenseController.viewLicense);

export default licenseRouter;
