const mongoose = require("mongoose");

const TheorySchema = new mongoose.Schema(
  {
    topicId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "Box",
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "hard", "expert"],
      default: "beginner",
      required: true,
    },
    section: {
      type: String, // e.g., 'hooks', 'concepts' - top level grouping
      required: false, // Made optional for simplified form
      default: "general",
    },
    subject: {
      type: String, // e.g., 'react', 'js' - matches Subject path or id
      required: false, // Made optional for simplified form
      default: "general",
    },
    description: {
      type: String,
    },
    componentKey: {
      type: String, // Map to frontend component registry e.g. 'UseStateDemo'
    },
    liveCode: {
      type: String, // Dynamic code string for live rendering
    },
    order: {
      type: Number,
      default: 0,
    },
    sectionOrder: {
      type: Number,
      default: 0,
    },
    keywords: {
      type: [String],
      default: [],
      lowercase: true,
      trim: true,
    },
    // Rich text content from WYSIWYG editor (HTML format)
    richContent: {
      type: String,
      default: "",
    },
    // New flexible content blocks system
    contentBlocks: [
      {
        type: {
          type: String,
          enum: ["heading", "paragraph", "code", "list", "alert", "divider"],
          required: true,
        },
        level: Number, // For headings (1-6)
        content: String, // For heading, paragraph, code, alert
        language: String, // For code blocks (e.g., 'javascript', 'python')
        items: [String], // For lists
        alertType: {
          type: String,
          enum: ["info", "warning", "success", "error"],
        }, // For alerts
        order: {
          type: Number,
          default: 0,
        },
      },
    ],
    // Legacy theory object - kept for backward compatibility
    theory: {
      overview: String,
      definition: String,
      syntax: String,
      realLifeScenario: String,
      deepDive: String,
      pros: [String],
      cons: [String],
      whenToUse: [String],
      tips: [String],
      commonPitfalls: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Theory", TheorySchema);
