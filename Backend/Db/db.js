import mongoose from "mongoose";

const connectDB = async () => {
  mongoose
    .connect(process.env.DB_URL, console.log("Connected To DB"))
    .catch((err) => console.log(err));
};

export { connectDB };
