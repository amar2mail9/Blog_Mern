import { Category } from "../models/Category.models.js";

// create category
export const CreateCategory = async (req, res) => {
  const { title, description } = req.body;

  const isCategory = await Category.findOne({ title });

  if (!title) {
    return res.status(400).send({
      success: false,
      message: "Category is required",
    });
  }

  try {
    if (isCategory) {
      return res.status(409).send({
        success: false,
        message: "Category Already Exist",
      });
    } else {
      if (req.user.role === "admin") {
        const newCategory = new Category({
          title,
          description,
          author: req.user.userId,
        });

        await newCategory.save();
        return res.status(201).send({
          success: true,
          message: title + "  Category Added Successfully",
          data: newCategory,
        });
      } else {
        return res.status(400).send({
          success: false,
          message: "Access denied: You are not Authorized ",
        });
      }
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

// all Category
export const allCategories = async (req, res) => {
  const categories = await Category.find();
  try {
    if (!categories) {
      return res.status(400).send({
        success: false,
        message: "not found category",
      });
    }

    if (categories.length === 0) {
      return res.status(200).send({
        success: true,
        message: "No Category Available !Please add new Category",
      });
    } else {
      return res.status(200).send({
        success: true,
        data: categories,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

// single Category
export const singleCategory = async (req, res) => {
  const oneCategory = await Category.findById(req.params.id);
  try {
    if (!oneCategory) {
      return res.status(400).send({
        success: false,
        message: "not found category",
      });
    }

    return res.status(200).send({
      success: true,
      data: oneCategory,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

// single Category
export const deleteCategory = async (req, res) => {
  const oneCategory = await Category.deleteOne({ _id: req.params.id });
  try {
    if (!oneCategory) {
      return res.status(400).send({
        success: false,
        message: "not found category",
      });
    }

    return res.status(200).send({
      success: true,
      data: oneCategory,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

// edit category controller
export const editCategory = async (req, res) => {
  try {
    const { title, description } = req.body;
    const category = await Category.findById({ _id: req.params.id });
    if (!req.params.id) {
      return res.status(400).send({
        success: false,
        message: "Id is Required",
      });
    }

    category.title = title || category.title;
    category.description = description || category.description;

    await category.save();

    return res.status(200).send({
      success: true,
      message: "Update Success fully",
      category,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error,
    });
  }
};
