const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const mongoose = require("mongoose");
const Topic = require("../models/Topic");
const Theory = require("../models/Theory");
const connectDB = require("../config/db");

const seedDynamicData = async () => {
  try {
    await connectDB();

    // Ensure Topics exist
    const topic = await Topic.findOne({ topicId: "hooks" });
    if (!topic) {
      await Topic.create({
        topicId: "hooks",
        name: "React Hooks",
        subject: "react",
        icon: "Zap",
        color: "from-blue-500 to-cyan-500",
        order: 1,
      });
      console.log("Created 'hooks' topic");
    }

    const theories = [
      {
        topicId: "use-state",
        title: "useState Hook",
        subject: "react",
        section: "hooks",
        level: "beginner",
        icon: "Box",
        order: 1,
        description:
          "The most fundamental hook for managing state in functional components.",
        richContent: "", // Explicitly empty to force usage of contentBlocks
        contentBlocks: [
          {
            type: "heading",
            level: 2,
            content: "Overview",
            order: 0,
          },
          {
            type: "paragraph",
            content:
              "useState is a Hook that lets you add React state to function components. It was introduced in React 16.8 to allow state management without writing class components.",
            order: 1,
          },
          {
            type: "heading",
            level: 2,
            content: "Syntax",
            order: 2,
          },
          {
            type: "code",
            language: "javascript",
            content: "const [state, setState] = useState(initialState);",
            order: 3,
          },
          {
            type: "heading",
            level: 2,
            content: "Example Usage",
            order: 4,
          },
          {
            type: "code",
            language: "javascript",
            content:
              "import React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}",
            order: 5,
          },
          {
            type: "alert",
            alertType: "info",
            content:
              "Note: The setState function identity is stable and won’t change on re-renders. This is why it’s safe to omit from the useEffect or useCallback dependency list.",
            order: 6,
          },
          {
            type: "heading",
            level: 2,
            content: "Best Practices",
            order: 7,
          },
          {
            type: "list",
            items: [
              "Always declare hooks at the top level of your component",
              "Don't call hooks inside loops, conditions, or nested functions",
              "Use multiple state variables for unrelated data instead of one big object",
            ],
            order: 8,
          },
        ],
      },
      {
        topicId: "use-effect",
        title: "useEffect Hook",
        subject: "react",
        section: "hooks",
        level: "intermediate",
        icon: "Activity",
        order: 2,
        description:
          "Handle side effects like data fetching, subscriptions, or manually changing the DOM.",
        richContent: "",
        contentBlocks: [
          {
            type: "heading",
            level: 2,
            content: "Overview",
            order: 0,
          },
          {
            type: "paragraph",
            content:
              "The Effect Hook lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes, but unified into a single API.",
            order: 1,
          },
          {
            type: "heading",
            level: 2,
            content: "Syntax",
            order: 2,
          },
          {
            type: "code",
            language: "javascript",
            content:
              "useEffect(() => {\n  // Effect code here\n  return () => {\n    // Cleanup code here\n  };\n}, [dependencies]);",
            order: 3,
          },
          {
            type: "alert",
            alertType: "warning",
            content:
              "If you omit the dependency array, the effect runs after every render. This can lead to performance issues or infinite loops.",
            order: 4,
          },
        ],
      },
    ];

    for (const theory of theories) {
      const exists = await Theory.findOne({ topicId: theory.topicId });
      if (!exists) {
        await Theory.create(theory);
        console.log(`Created theory: ${theory.title}`);
      } else {
        Object.assign(exists, theory);
        await exists.save();
        console.log(`Updated theory: ${theory.title}`);
      }
    }

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDynamicData();
