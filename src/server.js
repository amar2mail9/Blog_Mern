import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import express from "express";
import { authRouter } from "./routes/auth.routes.js";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import blogRoutes from "./routes/blog.routes.js";
import categoryRoute from "./routes/category.routes.js";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB();
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// auth routes
app.use("/v1/auth", authRouter);

// blog
app.use("/v1", blogRoutes);

// category
app.use("/v1/", categoryRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`sever is running on ${PORT}`);
});
