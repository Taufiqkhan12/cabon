import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import { ApiError } from "./ApiError.js";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  port: 465,
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_APP_PASSWORD,
  },
});

async function generateAndSendOtp(email) {
  const generateOtp = crypto.randomInt(100000, 999999);

  const otpExpiry = Date.now() + 5 * 60 * 1000;

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
    .replace("{{OTP}}", generateOtp)
    .replace("{{year}}", currentYear);

  // Email options
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: "Email Verification Code",
    html: htmlContent,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    return { generateOtp, otpExpiry };
  } catch (error) {
    throw new ApiError(500, "Failed to send OTP");
  }
}

async function sendResetPasswordEmail(email, resetUrl) {
  console.log(resetUrl);
  if (!email || !resetUrl) {
    throw new ApiError(400, "Email and Reseturl is required");
  }

  const __filename = fileURLToPath(import.meta.url);

  const __dirname = path.dirname(__filename);

  const templatePath = path.join(
    __dirname,
    "..",
    "email",
    "resetPasswordEmailTemplate.html"
  );

  let htmlContent;

  try {
    htmlContent = fs.readFileSync(templatePath, "utf-8");
  } catch (error) {
    throw new ApiError(500, "Failed to read email template");
  }

  htmlContent = htmlContent.replace("{resetURL}", resetUrl);

  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: "Password Reset Link",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new ApiError(500, "Failed to send Reset Password Mail");
  }
}

export { generateAndSendOtp, sendResetPasswordEmail };
