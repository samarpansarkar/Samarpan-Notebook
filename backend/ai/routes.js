const express = require("express");
const router = express.Router();
const { generateTheoryContent } = require("./controller");

router.post("/generate", generateTheoryContent);

module.exports = router;
