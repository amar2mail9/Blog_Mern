import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
      console.log("DataBase connected ");
    });
  } catch (error) {
    console.log("Connection Failed", error);
  }
};
