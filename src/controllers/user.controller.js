import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

dotenv.config();

// create user
export const registerUser = async (req, res) => {
  const { email, phone, password, name } = req.body;
  const user = await User.findOne({ email });

  if (!email || !phone || !password || !name) {
    return res.status(400).send({
      success: false,
      message: "All Field are required",
    });
  }

  try {
    if (user) {
      return res.status(409).json({
        success: false,
        message: "User Already Exist",
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = User({
        name,
        phone,
        email,
        password: hashPassword,
      });

      await newUser.save();
      return res.status(201).send({
        success: true,
        message: "Registration Successfully",
        data: {
          email,
          phone,
          name,
          role: newUser.role,
        },
      });
    }
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err,
    });
  }
};

// create Admin
export const adminSignUp = async (req, res) => {
  const { email, phone, password, name } = req.body;
  const user = await User.findOne({ email });

  // let file = req?.file?.path;
  // if (!file) {
  //   return res.status.json({
  //     success: false,
  //     message: "Image is required",
  //   });
  // }

  if (!email || !phone || !password || !name) {
    return res.status(400).send({
      success: false,
      message: "All Field are required",
    });
  }

  try {
    if (user) {
      return res.status(409).json({
        success: false,
        message: "User Already Exist",
      });
    } else {
      // const imgCloud = await cloudinary.uploader.upload(file);

      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = User({
        name,
        phone,
        email,
        password: hashPassword,
        role: "admin",
        // avatar: imgCloud?.secure_url,
      });

      await newUser.save();
      // if (newUser) {
      //   fs.unlink(file, (err) => {
      //     if (err) {
      //       console.log(err);
      //     }
      //     console.log(file, "Deleted");
      //   });
      // }
      return res.status(201).send({
        success: true,
        message: "Registration Successfully",
        data: {
          email,
          phone,
          name,
          role: newUser.role,
          // avatar: imgCloud?.secure_url,
        },
      });
    }
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err,
    });
  }
};

// login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if ((!email, !password)) {
    return res.status(400).send({
      success: false,
      message: "All Field are required",
    });
  }
  try {
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    } else {
      const isPassword = await bcrypt.compare(password, user.password);

      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );

      if (!isPassword) {
        return res.status(400).send({
          success: false,
          message: "Invalid Email or password",
        });
      } else {
        return res.status(200).send({
          success: true,
          message: "Login Successful",
          token,
          role: user.role,
        });
      }
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: err,
    });
  }
};

// get all user
const allUser = async (req, res) => {};

// delete user
const deleteUser = async (req, res) => {};

// forget password
const forgetPassword = async (req, res) => {};

// updateUser
const updateUserData = async (req, res) => {};
