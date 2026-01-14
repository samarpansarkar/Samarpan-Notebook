const http = require("http");

// Find a topic ID first
const getTopics = () => {
  return new Promise((resolve, reject) => {
    http
      .get("http://localhost:5000/api/topics", (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(JSON.parse(data)));
      })
      .on("error", reject);
  });
};

const getTopic = (id) => {
  return new Promise((resolve, reject) => {
    http
      .get(`http://localhost:5000/api/topics/${id}`, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(JSON.parse(data)));
      })
      .on("error", reject);
  });
};

const run = async () => {
  try {
    const topics = await getTopics();
    console.log("Found topics:", topics.length);

    const hooksTopic = topics.find((t) => t.name.includes("Hooks"));
    if (hooksTopic) {
      console.log("Found Hooks Topic:", hooksTopic.name, hooksTopic._id);
      console.log("Hooks Topic Color (List):", hooksTopic.color);

      // Refetch detail
      const detail = await getTopic(hooksTopic._id);
      console.log(
        "Hooks Topic Content (Detail):",
        JSON.stringify(detail, null, 2)
      );
    } else {
      console.log("Hooks topic not found");
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
};

run();
