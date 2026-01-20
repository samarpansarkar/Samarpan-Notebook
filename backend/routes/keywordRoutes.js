const express = require("express");
const router = express.Router();
const Keyword = require("../models/Keyword");
const Theory = require("../models/Theory");
const { protect, admin } = require("../middleware/authMiddleware");

// @desc    Get all keywords
// @route   GET /api/keywords
// @access  Public
router.get("/", async (req, res) => {
  try {
    const keywords = await Keyword.find().sort({ name: 1 });
    res.json(keywords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get keyword by ID
// @route   GET /api/keywords/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const keyword = await Keyword.findById(req.params.id);
    if (!keyword) {
      return res.status(404).json({ message: "Keyword not found" });
    }
    res.json(keyword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a new keyword
// @route   POST /api/keywords
// @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const { name, description, category } = req.body;

    // Check if keyword already exists
    const existingKeyword = await Keyword.findOne({ name: name.toLowerCase() });
    if (existingKeyword) {
      return res.status(400).json({ message: "Keyword already exists" });
    }

    const keyword = new Keyword({
      name: name.toLowerCase().trim(),
      description,
      category,
    });

    const createdKeyword = await keyword.save();
    res.status(201).json(createdKeyword);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a keyword
// @route   PUT /api/keywords/:id
// @access  Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const keyword = await Keyword.findById(req.params.id);

    if (!keyword) {
      return res.status(404).json({ message: "Keyword not found" });
    }

    const { name, description, category } = req.body;

    // If name is being changed, check for duplicates
    if (name && name.toLowerCase() !== keyword.name) {
      const existingKeyword = await Keyword.findOne({
        name: name.toLowerCase(),
      });
      if (existingKeyword) {
        return res.status(400).json({ message: "Keyword name already exists" });
      }

      // Update keyword in all theories that use it
      const oldName = keyword.name;
      const newName = name.toLowerCase().trim();

      await Theory.updateMany(
        { keywords: oldName },
        { $set: { "keywords.$[elem]": newName } },
        { arrayFilters: [{ elem: oldName }] }
      );

      keyword.name = newName;
    }

    if (description !== undefined) keyword.description = description;
    if (category) keyword.category = category;

    const updatedKeyword = await keyword.save();
    res.json(updatedKeyword);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a keyword
// @route   DELETE /api/keywords/:id
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const keyword = await Keyword.findById(req.params.id);

    if (!keyword) {
      return res.status(404).json({ message: "Keyword not found" });
    }

    // Remove keyword from all theories
    await Theory.updateMany(
      { keywords: keyword.name },
      { $pull: { keywords: keyword.name } }
    );

    await keyword.deleteOne();
    res.json({ message: "Keyword removed from all theories and deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Sync keywords from theories
// @route   POST /api/keywords/sync
// @access  Private/Admin
router.post("/sync", protect, admin, async (req, res) => {
  try {
    // Get all unique keywords from theories
    const theories = await Theory.find({}, "keywords");
    const allKeywords = theories.flatMap((t) => t.keywords || []);
    const uniqueKeywords = [...new Set(allKeywords)];

    let created = 0;
    let updated = 0;

    for (const keywordName of uniqueKeywords) {
      // Count usage
      const usageCount = theories.filter(
        (t) => t.keywords && t.keywords.includes(keywordName)
      ).length;

      // Find or create keyword
      const existingKeyword = await Keyword.findOne({ name: keywordName });

      if (existingKeyword) {
        existingKeyword.usageCount = usageCount;
        await existingKeyword.save();
        updated++;
      } else {
        await Keyword.create({
          name: keywordName,
          usageCount,
        });
        created++;
      }
    }

    res.json({
      message: "Keywords synced successfully",
      created,
      updated,
      total: uniqueKeywords.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update usage counts for all keywords
// @route   POST /api/keywords/update-counts
// @access  Private/Admin
router.post("/update-counts", protect, admin, async (req, res) => {
  try {
    const theories = await Theory.find({}, "keywords");
    const keywords = await Keyword.find();

    let updated = 0;

    for (const keyword of keywords) {
      const usageCount = theories.filter(
        (t) => t.keywords && t.keywords.includes(keyword.name)
      ).length;

      if (keyword.usageCount !== usageCount) {
        keyword.usageCount = usageCount;
        await keyword.save();
        updated++;
      }
    }

    res.json({
      message: "Usage counts updated",
      updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
