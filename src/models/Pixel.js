const mongoose = require("mongoose");

const pixelSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true
    },

    websiteUrl: {
      type: String,
      required: true
    },

    imageUrl: {
      type: String,
      required: true
    },

    x: {
      type: Number,
      required: true
    },

    y: {
      type: Number,
      required: true
    },

    width: {
      type: Number,
      required: true
    },

    height: {
      type: Number,
      required: true
    },

    totalPixels: {
      type: Number,
      required: true
    },

    amountPaid: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Pixel", pixelSchema);