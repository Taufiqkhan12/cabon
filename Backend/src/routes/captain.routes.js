import { Router } from "express";
import {
  forgotPassword,
  getCaptainProfile,
  loginCaptain,
  logoutCaptain,
  registerCaptain,
  resendOtp,
  resetPassword,
  verifyEmail,
} from "../controllers/captain.controller.js";
import { verfiyCaptainJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerCaptain);

router.route("/verify-email").post(verfiyCaptainJwt, verifyEmail);

router.route("/resend-otp").post(resendOtp);

router.route("/login").post(loginCaptain);

router.route("/profile").get(verfiyCaptainJwt, getCaptainProfile);

router.route("/logout").post(verfiyCaptainJwt, logoutCaptain);

router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password/:resetToken").post(resetPassword);

export default router;
