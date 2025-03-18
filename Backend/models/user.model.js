import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
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
    minLength: [5, "Email must be atleast 5 character long"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified(this.password)) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);

  return token;
};

const User = mongoose.model("User", userSchema);

export { User };
