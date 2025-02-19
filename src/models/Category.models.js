import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      lowercase: true,
    },

    description: {
      type: String,
      minlength: 5,
      maxlength: 100,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
