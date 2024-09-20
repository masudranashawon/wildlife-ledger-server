require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const categoryRoutes = require("./routes/category.route");
const animalRoutes = require("./routes/animal.route");

// variable
const PORT = process.env.PORT || 8080;
const uri = process.env.MONGO_URI;

// express app
const app = express();

// middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(express.json());
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
