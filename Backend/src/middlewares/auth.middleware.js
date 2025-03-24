import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Captain } from "../models/captain.model.js";
import { BlacklistToken } from "../models/blacklistToken.model.js";

export const verfiyUserJwt = async (req, _, next) => {
  try {
    const token =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "Unauthorized Access");
    }

    const isBlackListed = await BlacklistToken.findOne({ token });

    if (isBlackListed) {
      throw new ApiError(401, "Unauthorized Access");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      throw new ApiError(400, "Invalid Token");
    }

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      throw new ApiError(400, "Invalid Token");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const verfiyCaptainJwt = async (req, _, next) => {
  try {
    const token =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "Unauthorized Access");
    }

    const isBlackListed = await BlacklistToken.findOne({ token });

    if (isBlackListed) {
      throw new ApiError(401, "Unauthorized Access");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      throw new ApiError(400, "Invalid Token");
    }

    const captain = await Captain.findById(decodedToken?._id).select(
      "-password"
    );

    if (!captain) {
      throw new ApiError(400, "Invalid Token");
    }

    req.captain = captain;
    next();
  } catch (error) {
    next(error);
  }
};
