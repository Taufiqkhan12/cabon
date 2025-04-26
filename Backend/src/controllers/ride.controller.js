import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { createUserRide, getFare } from "../services/ride.service.js";
import { userRideCreateValidation } from "../validator/ride.validator.js";
import {
  getCaptainsInTheRadius,
  getAddressCoordinate,
} from "../services/maps.service.js";
import { sendMessageToSocketId } from "../socket.js";
import { User } from "../models/user.model.js";

const createRide = async (req, res, next) => {
  try {
    const { pickup, destination, vehicletype } = req.body;

    if (!pickup || !destination || !vehicletype) {
      throw new ApiError(400, "All fields are required");
    }

    const inputError = userRideCreateValidation({
      pickup,
      destination,
      vehicletype,
    });

    if (inputError) {
      throw new ApiError(400, `${inputError[0].message}`);
    }

    const ride = await createUserRide(
      req.user._id,
      pickup,
      destination,
      vehicletype
    );

    const pickupCoordinates = await getAddressCoordinate(pickup);

    const captainsInRadius = await getCaptainsInTheRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lng,
      2000
    );

    if (!ride) {
      throw new ApiError(500, "Something went wromg while creating ride");
    }

    ride.otp = "";

    const rideWithUser = await User.findOne({ _id: ride._id }).populate("User");

    captainsInRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: ride,
      });
    });

    return res
      .status(201)
      .json(new ApiResponse(201, { ride }, "Ride created sucessfully"));
  } catch (error) {
    next(error);
  }
};

const getRideFare = async (req, res, next) => {
  try {
    const { pickup, destination } = req.query;

    if (!pickup || !destination) {
      throw new ApiError(400, "All fields are required");
    }

    const fare = await getFare(pickup, destination);

    if (!fare) {
      throw new ApiError(500, "Something went wrong");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, { fare }, "Fare fetched successfully"));
  } catch (error) {
    next(error);
  }
};

const confirmRide = async (req, res, next) => {
  try {
    const { rideId } = req.body;

    if (!rideId) {
      throw new ApiError(400, "Ride id is required");
    }

    const ride = confirmRideService(rideId, req.captain._id);

    return res.status(200).json(new ApiResponse(200, ride, "Ride confirmed"));
  } catch (error) {
    next(error);
  }
};

export { createRide, getRideFare, confirmRide };
