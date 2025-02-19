import { Blog } from "../models/blog.models.js";
import { User } from "../models/user.model.js";
import fs from "fs";

import { v2 as cloudinary } from "cloudinary";

// create blog
export const createBlog = async (req, res) => {
  const { title, category, content } = req.body;
  const file = req?.file?.path;

  if (!title) {
    return res.status(400).send({
      success: false,
      message: "All Field Are required",
    });
  }

  if (req.user.userId && req.user.role === "admin") {
    const blog = await Blog.findOne({ title });

    if (blog) {
      return res.status(409).send({
        success: false,
        message: "Blog Already Exist",
      });
    }
    const imageBlog = await cloudinary.uploader.upload(file, {
      folder: "Blog Image",
    });

    const newBlog = new Blog({
      title,
      category: category?.toLowerCase() || "Uncategorized",
      author: req.user.userId,
      content,
      image: imageBlog.secure_url,
    });

    const user = await User.findById(req.user.userId);
    await newBlog.save();

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    user.blogs.push(newBlog);
    await user.save();
    fs.unlink(file, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(file, "Deleted Successfully");
    });

    return res.status(201).send({
      success: true,
      message: "Blog created successfully",
      data: newBlog,
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "Access dined: Only Admin",
    });
  }
};

// // get Category wish blog
// export const categoryWiseBlog = async (req, res) => {
//   let params = req.params.category;
//   const categoryBlog = await Blog.find({
//     category: params,
//   });

//   try {
//     if (!categoryBlog) {
//       return res.status(400).send({
//         success: false,
//         message: "Wrong Category name Data not found",
//       });
//     }

//     return res.status(200).send({
//       success: true,
//       data: categoryBlog,
//       count: categoryBlog.length,
//     });
//   } catch (error) {
//     return res.status(500).send({
//       success: false,
//       message: error,
//     });
//   }
// };

// get  all blog
export const blogs = async (req, res) => {
  const Blogs = await Blog.find();
  try {
    if (!Blogs) {
      return res.status(400).send({
        success: false,
        message: "No Blog Available",
      });
    }

    return res.status(200).send({
      success: true,
      data: Blogs,
      count: Blogs.length,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

// Single blog by id
export const SingleBlog = async (req, res) => {
  if (req.params.id) {
    const singleBlog = await Blog.findById(req.params.id);

    try {
      if (!singleBlog) {
        return res.status(404).send({
          success: false,
          message: "Not found",
        });
      }

      return res.status(200).send({
        success: true,
        data: singleBlog,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error,
      });
    }
  }
};

// Single Blog Delete blog by id
export const singleBlogDelete = async (req, res) => {
  if (req.params.id) {
    const singleBlog = await Blog.deleteOne({ _id: req.params.id });

    try {
      if (!singleBlog) {
        return res.status(404).send({
          success: false,
          message: "Not found",
        });
      }

      return res.status(200).send({
        success: true,
        message: "Delete Success",
        data: singleBlog,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: error,
      });
    }
  }
};

// edit Blog
export const editBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    const { id } = req.params;
    let blog = await Blog.findById({ _id: id });

    if (!id)
      res.status(400).sens({
        success: false,
        message: "in valid Blog ",
      });

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.category = category || blog.category;

    await blog.save();

    return res.status(202).send({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error,
    });
  }
};
