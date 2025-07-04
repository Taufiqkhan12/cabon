import mongoose, { Schema } from "mongoose";

const rideSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Captain",
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  fare: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "accepeted", "ongoing", "completed", "canceled"],
    default: "pending",
  },
  duration: {
    type: Number,
  },
  distance: {
    type: Number,
  },
  rating: {
    type: Number,
  },

  paymentID: {
    type: String,
  },

  orderID: {
    type: String,
  },

  signature: {
    type: String,
  },
  otp: {
    type: Number,
    select: false,
    required: true,
  },
});

const Ride = mongoose.model("Ride", rideSchema);

export { Ride };
