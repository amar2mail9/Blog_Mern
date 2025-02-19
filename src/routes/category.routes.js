import express from "express";
import {
  allCategories,
  CreateCategory,
  deleteCategory,
  editCategory,
  singleCategory,
} from "../controllers/Category.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";

const categoryRoute = express.Router();

// create category
categoryRoute.post("/category/new", verifyToken, verifyAdmin, CreateCategory);

// get all category
categoryRoute.get("/categories", allCategories);

// Single Category
categoryRoute.get("/category/:id", singleCategory);

// delete category
categoryRoute.delete("/category/:id", verifyToken, verifyAdmin, deleteCategory);

// Edit Category
categoryRoute.put("/category/:id", verifyToken, verifyAdmin, editCategory);

export default categoryRoute;
