const Animal = require("../models/animal.model");
const multer = require("multer");
const path = require("path");

// get all animals
const getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find({})
      .sort({
        createdAt: -1,
      })
      .populate("category");

    res.status(200).json(animals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// create an animal
const createAnimal = async (req, res) => {
  try {
    const { name, category } = req.body;
    const { filename } = req.file;

    if (!name | !category) {
      throw new Error("All field is required and cannot be empty");
    }

    const isExist = await Animal.findOne({ name });

    if (isExist) {
      return res.status(400).json({ message: "Animal name already exist!" });
    }

    // animal creating and store image
    const animal = await Animal.create({
      name,
      category,
      image: filename,
    });

    res.status(201).json(animal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAnimals, createAnimal, upload };
