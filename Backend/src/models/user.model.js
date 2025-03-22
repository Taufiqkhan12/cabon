import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        minLength: [3, "First Name must be atleast 3 character long"],
      },
      lastname: {
        type: String,
        minLength: [3, "Last Name must be atleast 3 character long"],
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    socketId: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    otp: { type: Number },
    otpExpiry: { type: Number },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
  console.log("Entered Password:", enteredPassword);
  console.log("Stored Hashed Password:", this.password);

  const match = await bcrypt.compare(enteredPassword, this.password);
  console.log("Password Match:", match);

  return match;
};

userSchema.methods.generateAccessToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );

  return token;
};

userSchema.methods.generateRefreshToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

export { User };
