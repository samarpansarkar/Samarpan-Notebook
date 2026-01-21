const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, ".env") });
const mongoose = require("mongoose");
const Topic = require("./models/Topic");
const Theory = require("./models/Theory");
const connectDB = require("./config/db");

const verify = async () => {
  await connectDB();

  const topics = await Topic.find({ subject: "js" });
  console.log(`Found ${topics.length} JS Topics:`);
  topics.forEach((t) => console.log(`- ${t.name} (${t.topicId})`));

  const theories = await Theory.find({ subject: "js" });
  console.log(`\nFound ${theories.length} JS Theories:`);
  theories.forEach((t) => console.log(`- ${t.title} (Topic: ${t.section})`));

  process.exit();
};

verify();
