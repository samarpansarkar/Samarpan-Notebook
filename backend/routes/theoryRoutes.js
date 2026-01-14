const express = require("express");
const router = express.Router();
const Theory = require("../models/Theory");
const { protect, admin } = require("../middleware/authMiddleware");

// @desc    Fetch all topics
// @route   GET /api/theory
// @access  Public
router.get("/", async (req, res) => {
  try {
    const query = {};
    if (req.query.subject) {
      query.subject = req.query.subject;
    }
    const topics = await Theory.find().sort({ order: 1 });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Fetch single topic
// @route   GET /api/theory/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    let topic;
    // Check if id is a valid ObjectId
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      topic = await Theory.findById(req.params.id);
    }

    // If not found by ID (or not an ID), try topicId slug
    if (!topic) {
      topic = await Theory.findOne({ topicId: req.params.id });
    }

    if (topic) {
      res.json(topic);
    } else {
      res.status(404).json({ message: "Content not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Create a topic
// @route   POST /api/theory
// @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const { topicId } = req.body;
    const topicExists = await Theory.findOne({ topicId });
    if (topicExists) {
      return res.status(400).json({ message: "Content ID already exists" });
    }

    const newTopic = new Theory(req.body);
    const createdTopic = await newTopic.save();
    res.status(201).json(createdTopic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a topic
// @route   PUT /api/theory/:id
// @access  Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    let topic;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      topic = await Theory.findById(req.params.id);
    }
    if (!topic) {
      topic = await Theory.findOne({ topicId: req.params.id });
    }

    if (topic) {
      const updates = req.body;
      delete updates._id;
      delete updates.createdAt;
      delete updates.updatedAt;

      Object.assign(topic, updates);
      const updatedTopic = await topic.save(); // Keeping original save logic as findByIdAndUpdate was incomplete
      res.json(updatedTopic);
    } else {
      res.status(404).json({ message: "Content not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a topic
// @route   DELETE /api/theory/:id
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const topic = await Theory.findOne({ topicId: req.params.id });

    if (topic) {
      await topic.deleteOne();
      res.json({ message: "Content removed" });
    } else {
      res.status(404).json({ message: "Content not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
