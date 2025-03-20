import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { userRegistrationValidation } from "../validator/user.validator.js";

const registerUser = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !email || !password) {
      throw new Error("All fileds are required!");
    }

    const inputError = userRegistrationValidation({
      firstname,
      lastname,
      email,
      password,
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

    const hashedPassword = await User.hashPassword(password);

    const user = await User.create({
      fullname: {
        firstname,
        lastname,
      },
      lastname,
      email: normalizedEmail,
      password: hashedPassword,
    });

    const createdUser = await User.findById(user._id).select("-password ");

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong registering the user");
    }

    const token = user.generateAuthToken();

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { createdUser, token },
          "User Registered Sucessfully"
        )
      );
  } catch (error) {
    next(error);
  }
};

export { registerUser };
