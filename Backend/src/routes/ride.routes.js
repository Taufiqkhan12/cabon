import { Router } from "express";
import { createRide, getRideFare } from "../controllers/ride.controller.js";
import { verfiyUserJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create").post(verfiyUserJwt, createRide);

router.route("/get-fare").get(verfiyUserJwt, getRideFare);

export default router;
