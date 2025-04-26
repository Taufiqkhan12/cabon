import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  getAddressCoordinate,
  getAddressSuggestions,
  getDistanceAndTime,
} from "../services/maps.service.js";

const getCoordinates = async (req, res, next) => {
  try {
    const { address } = req.query;

    if (!address) {
      throw new ApiError(400, "Address is required");
    }

    if (address.length < 3) {
      throw new ApiError(400, "Address must be at least 3 characters long");
    }

    const sanitizedAddress = address
      .trim()
      .replace(/[^\w\s,-]/g, "")
      .split(" ")
      .join("");

    const coordinates = await getAddressCoordinate(sanitizedAddress);

    if (!coordinates) {
      throw new ApiError(404, "No coordinates found for this address");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { coordinates },
          "Coordinates fetched successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};

const getDistanceTime = async (req, res, next) => {
  try {
    const { origin, destination } = req.query;

    if (!origin || !destination) {
      throw new ApiError(400, "Origin and Destination are required");
    }

    if (origin.length < 3) {
      throw new ApiError(400, "Origin must be at least 3 characters long");
    }

    const sanitizedOrigin = origin
      .trim()
      .replace(/[^\w\s,-]/g, "")
      .split(" ")
      .join("");

    if (destination.length < 3) {
      throw new ApiError(400, "Destination must be at least 3 characters long");
    }

    const sanitizedDestination = destination
      .trim()
      .replace(/[^\w\s,-]/g, "")
      .split(" ")
      .join("");

    const { distance, duration } = await getDistanceAndTime(
      sanitizedOrigin,
      sanitizedDestination
    );

    if (!distance || !duration) {
      throw new ApiError(404, "No distance and time found for these address");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { distance, duration },
          "Distance and Time fetched successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};

const getSuggestions = async (req, res, next) => {
  try {
    const { address } = req.query;

    if (!address) {
      throw new ApiError(400, "Address is required");
    }

    if (address.length < 3) {
      throw new ApiError(400, "Address must be at least 3 characters long");
    }

    const sanitizedAddress = address
      .trim()
      .replace(/[^\w\s,-]/g, "")
      .split(" ")
      .join("");

    const suggestion = await getAddressSuggestions(sanitizedAddress);

    if (!suggestion) {
      throw new ApiError(404, "Failed to get address suggestions");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, { suggestion }, "Suggestions fetched successfully")
      );
  } catch (error) {
    next(error);
  }
};

export { getCoordinates, getDistanceTime, getSuggestions };
