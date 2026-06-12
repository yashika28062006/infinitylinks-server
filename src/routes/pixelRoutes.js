const express = require("express");

const router = express.Router();

const {
  createPixelPurchase,
  getAllPixels,
  getPixelById,
  updatePixel,
  deletePixel
} = require("../controllers/pixelController");

const {
  protect
} = require("../middleware/authMiddleware");

// Create Pixel Purchase (Protected)
router.post("/buy", protect, createPixelPurchase);

// Get All Pixels (Public)
router.get("/", getAllPixels);

// Get Single Pixel (Public)
router.get("/:id", getPixelById);

// Update Pixel (Protected)
router.put("/:id", protect, updatePixel);

// Delete Pixel (Protected)
router.delete("/:id", protect, deletePixel);

module.exports = router;