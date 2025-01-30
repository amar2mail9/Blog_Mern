import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import express from "express";
import { authRouter } from "./routes/auth.routes.js";
connectDB();
dotenv.config();
const app = express();
app.use(express.json());

// auth routes
app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`sever is running on ${PORT}`);
});
