import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import { v4 as uuidv4 } from "uuid";
import { License } from "../Models/License_Model.js";
import { User } from "../Models/User_Model.js";

export default class LicenseController {
  // Issuing license
  async issueLicense(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);

      const licenseFileName = `${uuidv4()}_license.pdf`;
      const filePath = path.join("public", "Licenses", licenseFileName);

      const doc = new PDFDocument();
      const writeStream = fs.createWriteStream(filePath);
      doc.pipe(writeStream);

      // License template
      doc.fontSize(14).text("Driving License", { align: "center" });

      doc.fontSize(12).text("---------------", { align: "center" });

      // Name
      doc
        .moveDown()
        .fontSize(12)
        .font("Helvetica-Bold")
        .text(`Name:`, { continued: true })
        .font("Helvetica")
        .text(`${user.name}`);

      // Address
      doc
        .moveDown()
        .fontSize(12)
        .font("Helvetica-Bold")
        .text(`Address:`, { continued: true })
        .font("Helvetica")
        .text(`${user.address}`);

      // Date of Birth
      // Date of Birth
      doc
        .moveDown()
        .fontSize(12)
        .font("Helvetica-Bold")
        .text(`Date of Birth:`, { continued: true })
        .font("Helvetica")
        .text(
          `${new Date(user.dateOfBirth).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`
        );

      // License Number
      doc
        .moveDown()
        .fontSize(12)
        .font("Helvetica-Bold")
        .text(`License Number:`, { continued: true })
        .font("Helvetica")
        .text(
          `DL-${Math.floor(Math.random() * 100000)}-${Math.floor(
            Math.random() * 10000
          )}`
        );

      // Valid Until
      doc
        .moveDown()
        .fontSize(12)
        .font("Helvetica-Bold")
        .text(`Valid Until:`, { continued: true })
        .font("Helvetica")
        .text(
          `${new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`
        );

      // Signature
      const remainingSpace = doc.page.height - doc.y;
      const signatureText = `Signature: ${user.name}`;
      const signatureX = 50;
      const signatureY = doc.page.height - 50;
      if (remainingSpace > 60) {
        // Minimum space required for signature
        doc
          .fontSize(12)
          .font("Helvetica-Bold")
          .text(signatureText, signatureX, signatureY, { align: "left" });
      } else {
        // Start a new page and then add the signature
        doc.addPage();
        doc
          .fontSize(12)
          .font("Helvetica-Bold")
          .text(signatureText, signatureX, 50, { align: "left" });
      }
      doc.end();

      // Wait for the document to finish writing before responding
      writeStream.on("finish", async () => {
        // Save license file record in database
        const newLicense = await License.create({
          userId,
          path: licenseFileName,
          dateIssued: new Date().toLocaleDateString(),
          licenseType: "new",
        });
        res.status(201).json({ fileName: licenseFileName });
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get user license
  async getUserLicense(req, res) {
    try {
      const { userId } = req.params;
      const license = await License.findOne({ userId });

      if (!license) {
        return res.status(404).json({ message: "License not found" });
      }

      // Serve the license file for download
      const filePath = path.resolve("public", "Licenses", license.path);
      res.download(filePath);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch user license", msg: error.message });
    }
  }

  // View license
  async viewLicense(req, res) {
    try {
      const { userId } = req.params;
      const license = await License.findOne({ userId });

      if (!license) {
        return res.status(404).json({ message: "License not found" });
      }
      // Serve the license file for viewing
      const filePath = path.resolve("public", "licenses", license.path);
      res.sendFile(filePath);
    } catch (error) {
      res.status(500).json({ message: "Failed to view user license" });
    }
  }
}
