const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes Placeholder
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/topics", require("./routes/topicRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
