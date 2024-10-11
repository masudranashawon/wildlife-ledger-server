const express = require("express");
const {
  getAnimals,
  createAnimal,
} = require("../controllers/animal.controller");
const { uploadImage } = require("../middleware/upload.middleware");

// router
const router = express.Router();

router.get("/", getAnimals);
router.post("/create", uploadImage, createAnimal);

module.exports = router;
