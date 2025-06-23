import { Router } from "express";
import {
  confirmRide,
  createRide,
  getRideFare,
  startRide,
  endRide,
} from "../controllers/ride.controller.js";
import {
  verfiyCaptainJwt,
  verfiyUserJwt,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create").post(verfiyUserJwt, createRide);

router.route("/get-fare").get(verfiyUserJwt, getRideFare);

router.route("/confirm").post(verfiyCaptainJwt, confirmRide);

router.route("/start-ride").get(verfiyCaptainJwt, startRide);

router.route("/end-ride").post(verfiyCaptainJwt, endRide);

export default router;
