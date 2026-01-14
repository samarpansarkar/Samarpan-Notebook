const express = require("express");
const router = express.Router();
const Topic = require("../models/Topic");
const { protect, admin } = require("../middleware/authMiddleware");

// @desc    Fetch all topics
// @route   GET /api/topics
// @access  Public
router.get("/", async (req, res) => {
  try {
    const query = {};
    if (req.query.subject) {
      query.subject = req.query.subject;
    }
    const topics = await Topic.find(query).sort({ order: 1 });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Fetch single topic
// @route   GET /api/topics/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (topic) {
      res.json(topic);
    } else {
      res.status(404).json({ message: "Topic not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Create a topic
// @route   POST /api/topics
// @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const { topicId } = req.body;
    const topicExists = await Topic.findOne({ topicId });
    if (topicExists) {
      return res.status(400).json({ message: "Topic index already exists" });
    }

    const topic = await Topic.create(req.body);
    res.status(201).json(topic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a topic
// @route   PUT /api/topics/:id
// @access  Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (topic) {
      topic.name = req.body.name || topic.name;
      topic.topicId = req.body.topicId || topic.topicId;
      topic.subject = req.body.subject || topic.subject;
      topic.icon = req.body.icon || topic.icon;
      topic.color = req.body.color || topic.color;
      topic.order = req.body.order !== undefined ? req.body.order : topic.order;

      const updatedTopic = await topic.save();
      res.json(updatedTopic);
    } else {
      res.status(404).json({ message: "Topic not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a topic
// @route   DELETE /api/topics/:id
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (topic) {
      await topic.deleteOne();
      res.json({ message: "Topic removed" });
    } else {
      res.status(404).json({ message: "Topic not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
