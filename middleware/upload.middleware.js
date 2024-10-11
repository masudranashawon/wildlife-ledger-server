const cloudinary = require("cloudinary").v2;

// Upload image to Cloudinary
const uploadImage = async (req, res, next) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "Image file is required" });
    }
    const file = req.files.image;

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "animals",
    });

    req.body.image = result.secure_url;

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  uploadImage,
};
