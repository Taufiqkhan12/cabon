import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DB_URL}/uber`
    );
    console.log(
      `MongoDB Connected!! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection failed:", error);
    process.exit(1);
  }
};

export { connectDB };
