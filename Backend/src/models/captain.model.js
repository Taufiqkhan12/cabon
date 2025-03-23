import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new Schema(
  {
    profileimage: {
      public_id: { type: String },
      secure_url: { type: String },
    },
    vehicleimage: {
      public_id: { type: String },
      secure_url: { type: String },
    },
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
      lowercas: true,
    },
    phone: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    socketId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    vehicle: {
      color: {
        type: String,
        required: true,
        minLength: [3, "Color must be atleast 3 characters long"],
      },
      plate: {
        type: String,
        required: true,
        minLength: [3, "Plate must be atleast 3 characters long"],
      },
      capacity: {
        type: Number,
        required: true,
        minLength: [1, "Capacity must be atleast 1"],
      },
      vehicleType: {
        type: String,
        required: true,
        enum: ["car", "bike", "auto"],
      },
    },
    location: {
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    otp: { type: Number },
    otpExpiry: { type: Date },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
  },
  {
    timestamps: true,
  }
);

captainSchema.pre("save", async function (next) {
  if (!this.isModified(this.password)) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

captainSchema.methods.generateAccessToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
  return token;
};

const Captain = mongoose.model("Captain", captainSchema);

export { Captain };
