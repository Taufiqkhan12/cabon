import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { BlacklistToken } from "../models/blacklistToken.model.js";

export const verfiyJwt = async (req, _, next) => {
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
