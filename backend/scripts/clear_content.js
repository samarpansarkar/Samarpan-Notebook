const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const mongoose = require("mongoose");
const Theory = require("../models/Theory");
const connectDB = require("../config/db");

const clearData = async () => {
  try {
    await connectDB();

    // Delete all theories
    const result = await Theory.deleteMany({});
    console.log(`Deleted ${result.deletedCount} theories.`);

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

clearData();
