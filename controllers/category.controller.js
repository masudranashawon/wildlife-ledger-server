const Category = require("../models/category.model");

// get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({
      createdAt: -1,
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create a category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new Error("Category field is required and cannot be empty");
    }

    const isExist = await Category.findOne({ name });

    if (isExist) {
      return res.status(400).json({ message: "Category name already exist!" });
    }

    // category creating
    const category = await Category.create({ name });

    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getCategories, createCategory };
