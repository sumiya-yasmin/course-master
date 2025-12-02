import mongoose from "mongoose";
import envConfig from "./envConfig.js";

const connectDB = async () => {
  try {
    const mongoUri = envConfig.DB.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in environment configuration");
    }
    await mongoose.connect(mongoUri, {
      dbName: envConfig.DB.DB_NAME,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
export default connectDB;
