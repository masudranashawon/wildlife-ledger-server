require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const categoryRoutes = require("./routes/category.route");
const animalRoutes = require("./routes/animal.route");

// variable
const PORT = process.env.PORT || 8080;
const uri = process.env.MONGO_URI;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// express app
const app = express();

// middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/", // temporary directory for file storage
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
  })
);

// test api
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Wildlife Ledger  server." });
});

// bypass api
app.use("/api/categories", categoryRoutes);
app.use("/api/animals", animalRoutes);

//mongodb database connection
mongoose.set("strictQuery", false);
mongoose
  .connect(uri)
  .then(() => {
    //listening for request
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
