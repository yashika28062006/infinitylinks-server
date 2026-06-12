const Pixel = require("../models/Pixel");


// CREATE PIXEL
const createPixelPurchase = async (req, res) => {
  try {
    const {
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
      owner: req.user._id,
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


// GET ALL PIXELS
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


// GET SINGLE PIXEL
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


// UPDATE PIXEL
const updatePixel = async (req, res) => {
  try {

    const pixel = await Pixel.findById(req.params.id);

    if (!pixel) {
      return res.status(404).json({
        message: "Pixel not found"
      });
    }

    // OWNER CHECK
    if (pixel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to update this pixel"
      });
    }

    const updatedPixel = await Pixel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.json(updatedPixel);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// DELETE PIXEL
const deletePixel = async (req, res) => {
  try {

    const pixel = await Pixel.findById(req.params.id);

    if (!pixel) {
      return res.status(404).json({
        message: "Pixel not found"
      });
    }

    // OWNER CHECK
    if (pixel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to delete this pixel"
      });
    }

    await pixel.deleteOne();

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