const mongoose = require("mongoose");
const Topic = require("./backend/models/Topic");
const dotenv = require("dotenv");

dotenv.config({ path: "./backend/.env" });

const verify = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const topic = await Topic.findOne({ name: "Hooks Mod" }); // or Hooks Mod Changed
    console.log("Topic found:", topic ? topic.name : "Not found");
    console.log("Color field:", topic ? topic.color : "N/A");

    // Also check if any topic has color
    const anyColor = await Topic.findOne({ color: { $exists: true } });
    console.log("Any topic with color?", !!anyColor);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

verify();
