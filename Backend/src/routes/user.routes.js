import { Router } from "express";
import {
  forgotPassword,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  resendOtp,
  resetPassword,
  verifyEmail,
} from "../controllers/user.controller.js";
import { verfiyUserJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/verify-email").post(verfiyUserJwt, verifyEmail);

router.route("/resend-otp").post(resendOtp);

router.route("/login").post(loginUser);

router.route("/profile").get(verfiyUserJwt, getUserProfile);

router.route("/logout").post(verfiyUserJwt, logoutUser);

router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password/:resetToken").post(resetPassword);

export default router;
