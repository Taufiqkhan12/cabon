/* prettier-ignore */

import { Ride } from "../models/ride.model.js";
import { ApiError } from "../utils/ApiError.js";
import { getDistanceAndTime } from "./maps.service.js";
import crypto from "crypto";

export async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new ApiError(400, "Pickup and Destination is required");
  }

  const distanceTime = await getDistanceAndTime(pickup, destination);

  const baseFare = {
    car: 40,
    auto: 25,
    bike: 20,
  };

  const perKmRateFirst10km = {
    car: 14,
    auto: 12,
    bike: 5,
  };

  const perKmRateAfter10km = {
    car: 20,
    auto: 18,
    bike: 10,
  };

  const perMinuteRate = {
    car: 2,
    auto: 1,
    bike: 1,
  };

  let distanceNum = Number(distanceTime.distance.text.split(" ")[0]);
  let durationNum = Number(distanceTime.duration.text.split(" ")[0]);

  function calculateTieredFare(vehicleType) {
    let totalFare = baseFare[vehicleType];

    totalFare += durationNum * perMinuteRate[vehicleType];

    if (distanceNum <= 10) {
      totalFare += distanceNum * perKmRateFirst10km[vehicleType];
    } else {
      totalFare += 10 * perKmRateFirst10km[vehicleType];

      totalFare += (distanceNum - 10) * perKmRateAfter10km[vehicleType];
    }

    return Math.round(totalFare);
  }

  let carFare = calculateTieredFare("car");
  let autoFare = calculateTieredFare("auto");
  let bikeFare = calculateTieredFare("bike");

  if (carFare < 80) carFare = 80;
  if (autoFare < 40) autoFare = 40;
  if (bikeFare < 30) bikeFare = 30;

  return {
    car: carFare,
    auto: autoFare,
    bike: bikeFare,
  };
}

async function getOtp() {
  return crypto.randomInt(1000, 9999);
}

export const createUserRide = async (
  user,
  pickup,
  destination,
  vehicletype
) => {
  if (!user || !pickup || !destination || !vehicletype) {
    throw new ApiError(400, "All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const otp = await getOtp();

  const ride = await Ride.create({
    user,
    pickup,
    destination,
    fare: fare[vehicletype],
    otp,
  });

  return ride;
};

export const confirmRideService = async ({ rideId }) => {
  if (!rideId) {
    throw new ApiError(400, "Ride id is required");
  }

  await Ride.findOneAndUpdate(
    { _id: rideId },
    { status: "accepted", captain: captain._id }
  );

  const ride = await Ride.findOne({ _id: rideId }).populate("User");

  if (!ride) {
    throw new ApiError(404, "Ride not found");
  }

  return ride;
};
