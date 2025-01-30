import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Please Enter a valid email"],
      unique: true,
      lowercase: true,
    },
    photo: {
      type: String,
      required: true,
    },
    role: {
      type: String,

      enum: ["user", "admin"],
      default: "user",
    },

    password: {
      type: String,
      required: true,
      selected: false,
      minlength: 8,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
