import dotenv from "dotenv";
dotenv.config();

import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// create new users
export const userRegister = async (req, res) => {
  const { name, password, email, photo, phone, role } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(400).send({
      success: false,
      message: "Email is required",
    });
  }

  // Check if name is provided
  if (!name) {
    return res.status(400).send({
      success: false,
      message: "Name is required",
    });
  }

  // Check if password is provided
  if (!password) {
    return res.status(400).send({
      success: false,
      message: "Password is required",
    });
  }

  // Check if password length is sufficient
  if (password.length < 8) {
    return res.status(400).send({
      success: false,
      message: "Password must be at least 8 characters",
    });
  }

  // Check if phone is provided
  if (!phone) {
    return res.status(400).send({
      success: false,
      message: "Phone number is required",
    });
  }

  // Check if photo is provided
  if (!photo) {
    return res.status(400).send({
      success: false,
      message: "Photo is required",
    });
  }

  // Check if user with the same email or phone already exists
  const user = await User.findOne({ email });
  const phoneNum = await User.findOne({ phone });

  if (!user && !phoneNum) {
    // Hash the password before saving
    const hashPassword = await bcrypt.hash(password, 10); // Use `bcrypt.hash` instead of `bcrypt.hashSync` for async consistency

    // Save the new user to the database
    await User({
      name,
      password: hashPassword,
      email,
      photo,
      phone,
      role, // Make sure `role` is being validated, e.g., it should be either 'user' or 'admin'
    }).save();

    return res.status(201).send({
      success: true,
      message: "Sign Up Successfully",
      data: {
        name,
        email,
        photo,
        phone,
        role,
      },
    });
  } else {
    // If user already exists by email
    if (user) {
      return res.status(409).send({
        success: false,
        message: "User Already Exists with this Email", // Fixed extra space in the message
      });
    }

    // If user already exists by phone
    if (phoneNum) {
      return res.status(409).send({
        success: false,
        message: "User Already Exists with this Phone", // Fixed extra space in the message
      });
    }
  }
};

// create new admin
export const adminRegister = async (req, res) => {
  const { name, password, email, photo, phone, role } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(400).send({
      success: false,
      message: "Email is required",
    });
  }

  // Check if name is provided
  if (!name) {
    return res.status(400).send({
      success: false,
      message: "Name is required",
    });
  }

  // Check if password is provided
  if (!password) {
    return res.status(400).send({
      success: false,
      message: "Password is required",
    });
  }

  // Check if password length is sufficient
  if (password.length < 8) {
    return res.status(400).send({
      success: false,
      message: "Password must be at least 8 characters",
    });
  }

  // Check if phone is provided
  if (!phone) {
    return res.status(400).send({
      success: false,
      message: "Phone number is required",
    });
  }

  // Check if photo is provided
  if (!photo) {
    return res.status(400).send({
      success: false,
      message: "Photo is required",
    });
  }

  // Check if user with the same email or phone already exists
  const user = await User.findOne({ email });
  const phoneNum = await User.findOne({ phone });

  if (!user && !phoneNum) {
    // Hash the password before saving
    const hashPassword = await bcrypt.hash(password, 10); // Use `bcrypt.hash` instead of `bcrypt.hashSync` for async consistency

    // Save the new admin to the database
    await User({
      name,
      password: hashPassword,
      email,
      photo,
      phone,
      role: "admin", // Assign the role 'admin'
    }).save();

    return res.status(201).send({
      success: true,
      message: "Admin Sign Up Successfully",
      data: {
        name,
        email,
        photo,
        phone,
        role: "admin", // Ensure role is set to admin
      },
    });
  } else {
    // If admin already exists by email
    if (user) {
      return res.status(409).send({
        success: false,
        message: "Admin Already Exists with this Email", // Fixed extra space in the message
      });
    }

    // If admin already exists by phone
    if (phoneNum) {
      return res.status(409).send({
        success: false,
        message: "Admin Already Exists with this Phone", // Fixed extra space in the message
      });
    }
  }
};

// login user
export const UserLoginControllers = async (req, res) => {
  const { email, password } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(400).send({
      success: false,
      message: "Email is required",
    });
  }

  // Check if password is provided
  if (!password) {
    return res.status(400).send({
      success: false,
      message: "Password is required",
    });
  }

  // Check if password length is sufficient
  if (password.length < 8) {
    return res.status(400).send({
      success: false,
      message: "Password must be at least 8 characters",
    });
  }

  // Check if user exists
  const user = await User.findOne({ email });

  if (user) {
    // Compare the provided password with the hashed password
    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (isMatchPassword) {
      // Generate a JWT token
      const token = jwt.sign(
        { userId: user._id }, // Use `_id`, not `__id`
        process.env.SECRET_KEY,
        {
          expiresIn: "1h", // Set token expiration time
        }
      );

      return res.status(200).send({
        success: true,
        message: "Login Successfully",
        token,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password", // Incorrect login details
      });
    }
  } else {
    return res.status(404).send({
      success: false,
      message: "User Not Found", // User doesn't exist
    });
  }
};

// logina admin
export const adminLoginControllers = async (req, res) => {
  const { email, password } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(400).send({
      success: false,
      message: "Email is required",
    });
  }

  // Check if password is provided
  if (!password) {
    return res.status(400).send({
      success: false,
      message: "Password is required",
    });
  }

  // Check if password length is sufficient
  if (password.length < 8) {
    return res.status(400).send({
      success: false,
      message: "Password must be at least 8 characters",
    });
  }

  // Check if user exists
  const user = await User.findOne({ email });

  if (user) {
    if (user.role !== "admin") {
      return res.status(403).send({
        success: true,
        message: "You are not Admin ",
      });
    }

    // Compare the provided password with the hashed password
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (isMatchPassword && user.role === "admin") {
      // Generate a JWT token
      const token = jwt.sign(
        { userId: user._id }, // Use `_id`, not `__id`
        process.env.SECRET_KEY,
        {
          expiresIn: "1h", // Set token expiration time
        }
      );

      return res.status(200).send({
        success: true,
        message: "Admin Login Successfully ",
        token,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password", // Incorrect login details
      });
    }
  } else {
    return res.status(404).send({
      success: false,
      message: "User Not Found", // User doesn't exist
    });
  }
};
