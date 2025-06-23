import axios from "axios";
import { ApiError } from "../utils/ApiError.js";
import { Captain } from "../models/captain.model.js";

export const getAddressCoordinate = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address},+CA&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;

      return { lat: location.lat, lng: location.lng };
    } else {
      throw new ApiError(400, "Invalid address");
    }
  } catch (error) {
    throw new ApiError(500, error);
  }
};

export const getDistanceAndTime = async (origin, destination) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination}&origins=${origin}&key=${apiKey}`;

    const response = await axios.get(url);

    // Validate response structure
    if (!response?.data?.rows?.[0]?.elements?.[0]) {
      throw new ApiError(500, "Invalid response from Google Maps API");
    }

    const distance = response.data.rows[0].elements[0].distance;
    const duration = response.data.rows[0].elements[0].duration;

    if (response?.data?.rows?.[0]?.elements?.[0].status !== "OK") {
      throw new ApiError(400, "Could not calculate distance and time");
    }

    return {
      distance,
      duration,
    };
  } catch (error) {
    throw new ApiError(500, "Failed to get distance and time");
  }
};

export const getAddressSuggestions = async (address) => {
  try {
    // Input validation
    if (!address || typeof address !== "string") {
      throw new ApiError(400, "Valid address string is required");
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodedAddress}&key=${apiKey}`;

    const response = await axios.get(url);

    // Validate response
    if (!response?.data) {
      throw new ApiError(500, "Invalid API response");
    }

    if (response.data.status !== "OK") {
      throw new ApiError(400, "Failed to get address suggestions");
    }

    // Extract and format suggestions
    const suggestions = response.data.predictions;

    return suggestions;
  } catch (error) {
    throw new ApiError(500, "Failed to get address suggestions");
  }
};

export const getCaptainsInTheRadius = async (ltd, lng, radius) => {
  // radius in km

  const captains = await Captain.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371],
      },
    },
  });

  return captains;
};
