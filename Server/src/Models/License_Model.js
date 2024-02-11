import mongoose from "mongoose";

const drivingLicenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  path: { type: String, required: true },
  dateIssued: { type: Date, required: true },
  expirationDate: { type: Date },
  licenseType: { type: String, required: true },
});

export const License = mongoose.model("License", drivingLicenseSchema);
