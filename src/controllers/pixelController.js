const Pixel = require("../models/Pixel");

const createPixelPurchase = async (req, res) => {
  try {
    const {
      owner,
      title,
      websiteUrl,
      imageUrl,
      x,
      y,
      width,
      height
    } = req.body;

    const totalPixels = width * height;
    const amountPaid = totalPixels * 100;

    const pixel = await Pixel.create({
      owner,
      title,
      websiteUrl,
      imageUrl,
      x,
      y,
      width,
      height,
      totalPixels,
      amountPaid
    });

    res.status(201).json(pixel);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getAllPixels = async (req, res) => {
  try {

    const pixels = await Pixel.find()
      .populate("owner", "name email");

    res.json(pixels);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getPixelById = async (req, res) => {
  try {

    const pixel = await Pixel.findById(req.params.id)
      .populate("owner", "name email");

    if (!pixel) {
      return res.status(404).json({
        message: "Pixel not found"
      });
    }

    res.json(pixel);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updatePixel = async (req, res) => {
  try {

    const pixel = await Pixel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!pixel) {
      return res.status(404).json({
        message: "Pixel not found"
      });
    }

    res.json(pixel);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const deletePixel = async (req, res) => {
  try {

    const pixel = await Pixel.findByIdAndDelete(req.params.id);

    if (!pixel) {
      return res.status(404).json({
        message: "Pixel not found"
      });
    }

    res.json({
      success: true,
      message: "Pixel deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createPixelPurchase,
  getAllPixels,
  getPixelById,
  updatePixel,
  deletePixel
};