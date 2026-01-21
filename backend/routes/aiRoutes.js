const express = require("express");
const router = express.Router();
const { generateTheoryContent } = require("../controllers/aiController");

router.post("/generate", generateTheoryContent);

module.exports = router;
