import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
  blogs,
  // categoryWiseBlog,
  createBlog,
  editBlog,
  SingleBlog,
  singleBlogDelete,
} from "../controllers/blog.controller.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";
import { upload } from "../middleware/avatar.upload.js";

const blogRoutes = express.Router();

blogRoutes.post(
  "/blog/create",
  verifyToken,
  verifyAdmin,
  upload.single("image"),
  createBlog
);

// get all blog
blogRoutes.get("/blogs", blogs);

// blogRoutes.get("/category/:category", categoryWiseBlog);

// id wise blog
blogRoutes.get("/blog/:id", SingleBlog);

// Delete Blog
blogRoutes.delete("/blog/:id", verifyToken, verifyAdmin, singleBlogDelete);

// edit id by blog

blogRoutes.put("/blog/:id", editBlog);
export default blogRoutes;
