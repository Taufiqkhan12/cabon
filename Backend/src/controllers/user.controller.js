import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import {
  emailValidation,
  passwordValidation,
  userRegistrationValidation,
} from "../validator/user.validator.js";
import { BlacklistToken } from "../models/blacklistToken.model.js";
import {
  generateAndSendOtp,
  sendResetPasswordEmail,
} from "../utils/utilityFunction.js";
import jwt from "jsonwebtoken";
import { oauth2client } from "../utils/google.config.js";
import axios from "axios";

const registerUser = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, phone } = req.body;

    if (!firstname || !email || !password || !phone) {
      throw new Error("All fileds are required!");
    }

    const inputError = userRegistrationValidation({
      firstname,
      lastname,
      email,
      password,
      phone,
    });

    if (inputError) {
      throw new ApiError(400, `${inputError[0].message}`);
    }

    const normalizedEmail = email?.toLowerCase();

    const userExists = await User.findOne({ email: normalizedEmail });

    if (userExists) {
      throw new ApiError(400, "User with this email already exists");
    }

    const { generateOtp, otpExpiry } = await generateAndSendOtp(email);

    const user = await User.create({
      fullname: {
        firstname,
        lastname,
      },
      email: normalizedEmail,
      phone,
      password,
      otp: generateOtp,
      otpExpiry: otpExpiry,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken -otp -otpExpiry"
    );

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong registering the user");
    }

    const accessToken = user.generateAccessToken();

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .json(
        new ApiResponse(201, { createdUser }, "User Registered Sucessfully")
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

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(404, "No user registered with this email");
    }

    if (user.otp !== Number(otp) || user.otpExpiry < Date.now()) {
      user.otp = undefined;
      user.otpExpiry = undefined;
      await user.save();

      throw new ApiError(400, "Invalid or expired verification code");
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

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

    const user = await User.findOne({ email }).select(
      "-password -refreshToken -otp -otpExpiry"
    );

    if (!user) {
      throw new ApiError(404, "No user registered with this email");
    }

    if (user.isVerified) {
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Email already verified"));
    }

    const { generateOtp, otpExpiry } = await generateAndSendOtp(email);

    user.otp = generateOtp;
    user.otpExpiry = otpExpiry;
    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "New otp has been sent"));
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
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

    const userExist = await User.findOne({ email });

    if (!userExist) {
      throw new ApiError(401, "Invalid email or password ");
    }

    const isValid = await userExist.isPasswordCorrect(password);

    if (!isValid) {
      throw new ApiError(401, "Invalid user credentials");
    }

    const isVerified = userExist.isVerified;

    if (!isVerified) {
      const { generateOtp, otpExpiry } = await generateAndSendOtp(email);

      userExist.otp = generateOtp;
      userExist.otpExpiry = otpExpiry;
      await userExist.save();

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

    const accessToken = userExist.generateAccessToken();
    const refreshToken = userExist.generateRefreshToken();

    await User.findByIdAndUpdate(userExist._id, { refreshToken });

    const loggedInUser = await User.findById(userExist._id).select(
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
      .json(new ApiResponse(200, { loggedInUser }, "Logged in sucessfully"));
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      throw new ApiError(502, "Failed to get user");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, currentUser, "User fetched Successfully"));
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    await BlacklistToken.create({ token });

    const user = req.user;
    user.refreshToken = undefined;
    await user.save();

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

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(404, "User with this email does not exist");
    }

    const resetToken = user.generateAccessToken();
    const resetTokenExpiry = Date.now() + 1 * 60 * 60 * 1000;

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

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

    if (!decodeToken) {
      throw new ApiError(403, "Invalid or expired reset token");
    }

    const user = await User.findById(decodeToken?._id).select(
      "password resetToken resetTokenExpiry"
    );

    if (!user) {
      throw new ApiError(403, "Invalid or expired reset token");
    }

    if (user.resetToken !== resetToken || user.resetTokenExpiry < Date.now()) {
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save();
      throw new ApiError(403, "Invalid or expired reset token");
    }

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password reset successful"));
  } catch (error) {
    next(error);
  }
};

const signInWithGoogle = async (req, res, next) => {
  try {
    const { code } = req.params;
    const googleResponse = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleResponse.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`
    );

    const { email, name, picture } = userRes.data;
    return res
      .status(201)
      .json(new ApiResponse(201, { email, name, picture }, "User Fetched"));
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const incomingToken = req.cookies?.refreshToken;

    if (!incomingToken) {
      throw new ApiError(401, "Token is required");
    }

    const decodedToken = jwt.verify(incomingToken, process.env.JWT_SECRET);

    if (!decodedToken) {
      throw new ApiError(401, "Invalid refresh token");
    }

    const user = await User.findOne({ refreshToken: incomingToken });

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    const accessToken = user.generateAccessToken();

    const refreshToken = user.generateRefreshToken();

    await User.findByIdAndUpdate(user._id, { refreshToken });

    const options = {
      secure: true,
      httpOnly: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, {}, "Access token refreshed"));
  } catch (error) {
    next(error);
  }
};

const checkAuth = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ApiError(401, "Invalid Token");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user, "User authenticated"));
  } catch (error) {
    next(error);
  }
};

export {
  registerUser,
  verifyEmail,
  resendOtp,
  loginUser,
  getUserProfile,
  logoutUser,
  forgotPassword,
  resetPassword,
  signInWithGoogle,
  refreshToken,
  checkAuth,
};
