const { GoogleGenerativeAI } = require("@google/generative-ai");
const Groq = require("groq-sdk");

// Initialize Clients
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Timeout utility
const withTimeout = (promise, timeoutMs = 30000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeoutMs),
    ),
  ]);
};

// Common prompt generator
const generatePrompt = (
  topic,
  subject,
  additionalContext,
  tone,
  lengthInstruction,
) => `
    You are an expert technical writer and educator building content for a developer's notebook.
    Tone: ${tone}
    Length/Depth: ${lengthInstruction}
    
    Create a comprehensive, educational entry about "${topic}"${subject ? ` in the context of "${subject}"` : ""}.
    ${additionalContext ? `Additional Instructions: ${additionalContext}` : ""}

    Return strictly valid JSON (no markdown fences) with the following structure:
    {
        "title": "A clear, engaging title for the content",
        "description": "A concise summary (max 2 sentences)",
        "level": "beginner|intermediate|advanced|expert",
        "keywords": ["5-8 relevant keywords"],
        "richContent": "HTML string containing the main educational content. Use <h2>, <h3>, <p>, <ul>/ol with <li>, <strong>, <em>. Use <pre><code class=\"language-javascript\"> (or appropriate language) for code examples. Do NOT include <html> or <body> tags. Ensure the HTML is clean and formatted.",
        "liveCode": "A standalone, functional React functional component (JSX) that demonstrates the concept. Use 'export default function Demo() {...}'. Do NOT use imports (assume React, useState, useEffect are available globally or implicitly). If not applicable, return empty string."
    }
`;

// Gemini Generation Function
const generateWithGemini = async (prompt) => {
  try {
    if (!process.env.GEMINI_API_KEY) throw new Error("Gemini API Key missing");

    console.log("Starting Gemini generation...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(
      text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim(),
    );
  } catch (error) {
    console.error("Gemini Error:", error.message);
    throw error;
  }
};

// Groq Generation Function
const generateWithGroq = async (prompt) => {
  try {
    if (!process.env.GROQ_API_KEY) throw new Error("Groq API Key missing");

    console.log("Starting Groq generation...");
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "grok-4", // Fast and capable model
      temperature: 0.5,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("Empty response from Groq");

    return JSON.parse(content);
  } catch (error) {
    console.error("Groq Error:", error.message);
    throw error;
  }
};

exports.generateTheoryContent = async (req, res) => {
  try {
    const {
      topic,
      subject,
      additionalContext,
      tone = "professional",
      length = "detailed",
    } = req.body;

    if (!topic || !topic.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Topic is required" });
    }

    const lengthInstruction =
      {
        brief: "Keep it concise and to the point. Focus on key concepts.",
        detailed: "Provide a comprehensive explanation with examples.",
        comprehensive:
          "Create an in-depth guide covering all aspects, edge cases, and best practices.",
      }[length] || "Provide a comprehensive explanation.";

    const prompt = generatePrompt(
      topic,
      subject,
      additionalContext,
      tone,
      lengthInstruction,
    );

    console.log(`Starting Data Race: Gemini vs Groq for topic "${topic}"`);

    // Race both AI providers
    // We wrap them in withTimeout to enforce overall 30s limit
    const aiPromise = Promise.any([
      generateWithGemini(prompt).then((data) => ({ provider: "Gemini", data })),
      generateWithGroq(prompt).then((data) => ({ provider: "Groq", data })),
    ]);

    const { provider, data } = await withTimeout(aiPromise, 30000);

    console.log(`🏆 Winner: ${provider}`);

    // Validate structure
    if (!data.title || !data.richContent) {
      throw new Error("Invalid content structure generated");
    }

    res.json({
      success: true,
      data,
      provider, // Optional: let frontend know who won
    });
  } catch (error) {
    console.error("AI Race Failed:", error);

    let message = "All AI providers failed. Please try again.";
    if (error.errors) {
      // AggregateError from Promise.any
      message += ` Errors: ${error.errors.map((e) => e.message).join(", ")}`;
    } else {
      message = error.message;
    }

    res.status(500).json({
      success: false,
      message,
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
};
