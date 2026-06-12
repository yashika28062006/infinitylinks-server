const express = require("express");

const router = express.Router();

const {
  createPixelPurchase,
  getAllPixels,
  getPixelById,
  updatePixel,
  deletePixel
} = require("../controllers/pixelController");

// Create Pixel Purchase
router.post("/buy", createPixelPurchase);

// Get All Pixels
router.get("/", getAllPixels);

// Get Single Pixel
router.get("/:id", getPixelById);

// Update Pixel
router.put("/:id", updatePixel);

// Delete Pixel
router.delete("/:id", deletePixel);

module.exports = router;