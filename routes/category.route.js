const express = require("express");
const {
  getCategories,
  createCategory,
} = require("../controllers/category.controller");

// router
const router = express.Router();

router.get("/", getCategories);
router.post("/create", createCategory);

module.exports = router;
