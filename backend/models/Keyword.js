const mongoose = require("mongoose");

const KeywordSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    usageCount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: ["general", "technical", "framework", "concept", "pattern"],
      default: "general",
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster searches
KeywordSchema.index({ name: 1 });

module.exports = mongoose.model("Keyword", KeywordSchema);
