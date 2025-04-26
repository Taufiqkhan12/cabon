import { Captain } from "../models/captain.model.js";
import { captainRegistrationValidation } from "../validator/captain.validator.js";
import {
  emailValidation,
  passwordValidation,
} from "../validator/user.validator.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateAndSendOtp } from "../utils/utilityFunction.js";
import { BlacklistToken } from "../models/blacklistToken.model.js";
import { sendResetPasswordEmail } from "../utils/utilityFunction.js";
import jwt from "jsonwebtoken";

const registerCaptain = async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      password,
      color,
      plate,
      capacity,
      type,
    } = req.body;

    if (
      !firstname ||
      !lastname ||
      !email ||
      !phone ||
      !password ||
      !color ||
      !plate ||
      !capacity ||
      !type
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const inputError = captainRegistrationValidation({
      firstname,
      lastname,
      email,
      phone,
      password,
      color,
      plate,
      capacity,
      type,
    });

    if (inputError) {
      throw new ApiError(400, `${inputError[0].message}`);
    }

    const normalizedEmail = email?.toLowerCase();
    const typeLowercase = type?.toLowerCase();

    const captainExists = await Captain.findOne({ email: normalizedEmail });

    if (captainExists) {
      throw new ApiError(400, "Captain with this email already exists");
    }

    const { generateOtp, otpExpiry } = await generateAndSendOtp(email);

    const captain = await Captain.create({
      fullname: { firstname, lastname },
      email,
      password,
      phone,
      vehicle: { color, plate, capacity, vehicleType: typeLowercase },
      otp: generateOtp,
      otpExpiry: otpExpiry,
    });

    const createdCaptain = await Captain.findById(captain._id).select(
      "-password -refreshToken -otp -otpExpiry"
    );

    if (!createdCaptain) {
      throw new ApiError(500, "Something went wrong registering the captain");
    }

    const accessToken = captain.generateAccessToken();

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .json(
        new ApiResponse(
          201,
          { createdCaptain },
          "Captain Registered Sucessfully"
        )
      );
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!otp || !email) {
      throw new ApiError(400, "Otp and email is required");
    }

    const captain = await Captain.findOne({ email });

    if (!captain) {
      throw new ApiError(404, "No captain registered with this email");
    }

    if (captain.otp !== Number(otp) || captain.otpExpiry < Date.now()) {
      captain.otp = undefined;
      captain.otpExpiry = undefined;
      await captain.save();

      throw new ApiError(400, "Invalid or expired verification code");
    }

    captain.isVerified = true;
    captain.otp = undefined;
    captain.otpExpiry = undefined;
    await captain.save();

    return res
      .status(200)
      .json(
        new ApiResponse(200, {}, "Your email has been successfully verified")
      );
  } catch (error) {
    next(error);
  }
};

const resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new ApiError(400, "Email is required");
    }

    const inputError = emailValidation({ email });

    if (inputError) {
      throw new ApiError(400, `${inputError[0].message}`);
    }

    const captain = await Captain.findOne({ email }).select(
      "-password -refreshToken -otp -otpExpiry"
    );

    if (!captain) {
      throw new ApiError(404, "No captain registered with this email");
    }

    if (captain.isVerified) {
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Email already verified"));
    }

    const { generateOtp, otpExpiry } = await generateAndSendOtp(email);

    captain.otp = generateOtp;
    captain.otpExpiry = otpExpiry;
    await captain.save();

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "New otp has been sent"));
  } catch (error) {
    next(error);
  }
};

const loginCaptain = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "All fields must be filled");
    }

    const inputEmailError = emailValidation({ email });

    if (inputEmailError) {
      throw new ApiError(400, `${inputError[0].message}`);
    }

    const inputPasswordError = passwordValidation({ password });

    if (inputPasswordError) {
      throw new ApiError(400, `${inputError[0].message}`);
    }

    const captainExist = await Captain.findOne({ email });

    if (!captainExist) {
      throw new ApiError(401, "Invalid email or password ");
    }

    const isValid = await captainExist.isPasswordCorrect(password);

    if (!isValid) {
      throw new ApiError(401, "Invalid captain credentials");
    }

    const isVerified = captainExist.isVerified;

    if (!isVerified) {
      const { generateOtp, otpExpiry } = await generateAndSendOtp(email);

      captainExist.otp = generateOtp;
      captainExist.otpExpiry = otpExpiry;
      await captainExist.save();

      return res
        .status(403)
        .json(
          new ApiResponse(
            403,
            { isVerified },
            "Please verify your email to continue"
          )
        );
    }

    const accessToken = captainExist.generateAccessToken();

    const refreshToken = captainExist.generateRefreshToken();

    await Captain.findByIdAndUpdate(captainExist._id, { refreshToken });

    const loggedInCaptain = await Captain.findById(captainExist._id).select(
      "-password -refreshToken -otp -otpExpiry"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, { loggedInCaptain }, "Logged in sucessfully"));
  } catch (error) {
    next(error);
  }
};

const getCaptainProfile = async (req, res, next) => {
  try {
    const currentCaptain = req.captain;
    if (!currentCaptain) {
      throw new ApiError(502, "Failed to get captain");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, currentCaptain, "Captain fetched Successfully")
      );
  } catch (error) {
    next(error);
  }
};

const logoutCaptain = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    await BlacklistToken.create({ token });

    const captain = req.captain;
    captain.refreshToken = undefined;
    await captain.save();

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "Logged out successfully"));
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new ApiError(400, "Email is required");
    }

    const inputError = emailValidation({ email });

    if (inputError) {
      throw new ApiError(400, `${inputError[0].message}`);
    }

    const captain = await Captain.findOne({ email });

    if (!captain) {
      throw new ApiError(404, "Captain with this email does not exist");
    }

    const resetToken = jwt.sign({ _id: captain?._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const resetTokenExpiry = Date.now() + 1 * 60 * 60 * 1000;

    captain.resetToken = resetToken;
    captain.resetTokenExpiry = resetTokenExpiry;
    await captain.save();

    sendResetPasswordEmail(
      email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password reset request mail sent"));
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { resetToken } = req.params;
    const { password } = req.body;

    const inputError = passwordValidation({ password });

    if (inputError) {
      throw new ApiError(400, `${inputError[0].message}`);
    }

    const decodeToken = jwt.verify(resetToken, process.env.JWT_SECRET);
    console.log(decodeToken);
    if (!decodeToken) {
      throw new ApiError(403, "Invalid or expired reset token");
    }

    const captain = await Captain.findById(decodeToken?._id).select(
      "password resetToken resetTokenExpiry"
    );

    if (!captain) {
      throw new ApiError(403, "Invalid or expired reset token");
    }

    if (
      captain.resetToken !== resetToken ||
      captain.resetTokenExpiry < Date.now()
    ) {
      captain.resetToken = undefined;
      captain.resetTokenExpiry = undefined;
      await captain.save();
      throw new ApiError(403, "Invalid or expired reset token");
    }

    captain.password = password;
    captain.resetToken = undefined;
    captain.resetTokenExpiry = undefined;
    await captain.save();

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password reset successful"));
  } catch (error) {
    next(error);
  }
};

export {
  registerCaptain,
  verifyEmail,
  resendOtp,
  loginCaptain,
  getCaptainProfile,
  logoutCaptain,
  forgotPassword,
  resetPassword,
};
