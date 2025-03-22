import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import { ApiError } from "../utils/ApiError.js";
import dotenv from "dotenv";
dotenv.config();

const generateOtp = function () {
  return crypto.randomInt(100000, 999999);
};

const otpExpiry = function () {
  return Date.now() + 5 * 60 * 1000;
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  port: 465,
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_APP_PASSWORD,
  },
  logger: true,
});

async function sendOtp(email, otp) {
  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const __filename = fileURLToPath(import.meta.url);

  // Resolve the directory for the email template
  const __dirname = path.dirname(__filename);

  const templatePath = path.join(
    __dirname,
    "..",
    "email",
    "otpEmailTemplate.html"
  );

  let htmlContent;
  try {
    // Read the email template
    htmlContent = fs.readFileSync(templatePath, "utf8");
  } catch (error) {
    throw new ApiError(500, "Failed to read email template");
  }

  const currentYear = new Date().getFullYear();

  // Replace placeholders in the email template
  htmlContent = htmlContent
    .replace("{{OTP}}", otp)
    .replace("{{year}}", currentYear);

  // Email options
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: "Your OTP Verification Code",
    html: htmlContent,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new ApiError(500, "Failed to send OTP");
  }
}

export { generateOtp, otpExpiry, sendOtp };
