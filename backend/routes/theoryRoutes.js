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
    const topics = await Theory.find(query).sort({ order: 1 });
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

// @desc    Get all unique keywords
// @route   GET /api/theory/keywords/all
// @access  Public
router.get("/keywords/all", async (req, res) => {
  try {
    const theories = await Theory.find({}, "keywords");
    const allKeywords = theories.flatMap((t) => t.keywords || []);
    const uniqueKeywords = [...new Set(allKeywords)].sort();
    res.json(uniqueKeywords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get related theories by keywords
// @route   GET /api/theory/related/:id
// @access  Public
router.get("/related/:id", async (req, res) => {
  try {
    let currentTheory;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      currentTheory = await Theory.findById(req.params.id);
    }
    if (!currentTheory) {
      currentTheory = await Theory.findOne({ topicId: req.params.id });
    }

    if (
      !currentTheory ||
      !currentTheory.keywords ||
      currentTheory.keywords.length === 0
    ) {
      return res.json([]);
    }

    // Find theories with at least one matching keyword
    const relatedTheories = await Theory.find({
      _id: { $ne: currentTheory._id },
      keywords: { $in: currentTheory.keywords },
    }).select("topicId title subject keywords icon");

    // Calculate relevance score (number of matching keywords)
    const theoriesWithScore = relatedTheories.map((theory) => ({
      ...theory.toObject(),
      matchCount: theory.keywords.filter((k) =>
        currentTheory.keywords.includes(k),
      ).length,
    }));

    // Sort by relevance
    theoriesWithScore.sort((a, b) => b.matchCount - a.matchCount);

    res.json(theoriesWithScore);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Search theories by keywords
// @route   GET /api/theory/search/keywords
// @access  Public
router.get("/search/keywords", async (req, res) => {
  try {
    const keywords = req.query.keywords
      ? req.query.keywords.split(",").map((k) => k.trim().toLowerCase())
      : [];

    if (keywords.length === 0) {
      return res.json([]);
    }

    const theories = await Theory.find({
      keywords: { $in: keywords },
    }).select("topicId title subject keywords icon description");

    res.json(theories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
