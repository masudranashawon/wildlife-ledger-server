const express = require("express");
const {
  getAnimals,
  createAnimal,
  upload,
} = require("../controllers/animal.controller");

// router
const router = express.Router();

router.get("/", getAnimals);
router.post("/create", upload.single("image"), createAnimal);

module.exports = router;
