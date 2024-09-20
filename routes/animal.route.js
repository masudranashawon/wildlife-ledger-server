const express = require("express");
const {
  getAnimals,
  createAnimal,
} = require("../controllers/animal.controller");

// router
const router = express.Router();

router.get("/", getAnimals);
router.get("/create", createAnimal);

module.exports = router;
