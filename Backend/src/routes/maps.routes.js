import { Router } from "express";
import { verfiyUserJwt } from "../middlewares/auth.middleware.js";
import {
  getCoordinates,
  getDistanceTime,
  getSuggestions,
} from "../controllers/map.controller.js";

const router = Router();

router.route("/get-coordinates").get(verfiyUserJwt, getCoordinates);

router.route("/get-distance-time").get(verfiyUserJwt, getDistanceTime);

router.route("/get-suggestions").get(verfiyUserJwt, getSuggestions);

export default router;
