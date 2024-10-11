const Animal = require("../models/animal.model");

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

// create an animal
const createAnimal = async (req, res) => {
  try {
    const { name, category } = req.body;

    if (!name || !category) {
      throw new Error("All fields are required!");
    }

    const isExist = await Animal.findOne({ name });

    if (isExist) {
      return res.status(400).json({ message: "Animal name already exist!" });
    }

    // animal creating and store image
    const animal = await Animal.create({
      name,
      category,
      image: req?.body?.image,
    });

    res.status(201).json(animal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAnimals, createAnimal };
