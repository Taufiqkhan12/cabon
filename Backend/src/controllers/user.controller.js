import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { userRegistrationValidation } from "../validator/user.validator.js";
import { BlacklistToken } from "../models/blacklistToken.model.js";
import { generateOtp, otpExpiry, sendOtp } from "../utils/utilityFunction.js";

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
      console.log(inputError);
      throw new ApiError(400, `${inputError[0].message}`);
    }

    const normalizedEmail = email?.toLowerCase();

    const userExists = await User.findOne({ email: normalizedEmail });

    if (userExists) {
      throw new ApiError(400, "User with this email already exists");
    }

    const otp = generateOtp();
    const expiry = otpExpiry();

    const user = await User.create({
      fullname: {
        firstname,
        lastname,
      },
      email: normalizedEmail,
      phone,
      password,
      otp,
      otpExpiry: expiry,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken -otp -otpExpiry"
    );

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong registering the user");
    }

    await sendOtp(email, otp);

    const accessToken = user.generateAccessToken();

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
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
    const { otp } = req.body;

    if (!otp) {
      throw new ApiError(400, "Otp is required");
    }

    const user = req.user;

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

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "All fields must be filled");
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
      const otp = generateOtp();
      const expiry = otpExpiry();
      await sendOtp(email, otp);

      userExist.otp = otp;
      userExist.otpExpiry = expiry;
      await userExist.save();

      return res
        .status(403)
        .json(
          new ApiResponse(
            403,
            { isVerified, email },
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
      .json(
        new ApiResponse(
          200,
          { loggedInUser, accessToken },
          "Logged in sucessfully"
        )
      );
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

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("token", options)
      .json(new ApiResponse(200, {}, "Logged out successfully"));
  } catch (error) {
    next(error);
  }
};

export { registerUser, verifyEmail, loginUser, getUserProfile, logoutUser };
