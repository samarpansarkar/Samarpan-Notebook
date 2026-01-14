const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema(
  {
    topicId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String, // Store subject id/slug for easier querying initially
      required: true,
    },
    icon: {
      type: String,
      default: "Folder",
    },
    color: {
      type: String,
      default: "from-blue-500 to-cyan-500", // Default gradient
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Topic", TopicSchema);
