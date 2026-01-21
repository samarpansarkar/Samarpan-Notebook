require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    // There isn't a direct listModels on the client instance in older versions,
    // but let's try to just generate a simple "hello" with a few candidates
    // to see if we hit a different error, or use the recommended specific model.

    // Actually, newer SDKs might expose model listing differently.
    // Let's try to infer from the error which says "Call ListModels".
    // We can't easily call ListModels via the high-level SDK helper sometimes.

    // Let's try a few standard ones in a loop.
    const modelsToTry = [
      "gemini-1.5-flash",
      "gemini-pro",
      "gemini-1.5-pro-latest",
      "gemini-1.0-pro",
    ];

    for (const modelName of modelsToTry) {
      console.log(`Testing ${modelName}...`);
      try {
        const m = genAI.getGenerativeModel({ model: modelName });
        const result = await m.generateContent("Hello");
        console.log(`SUCCESS: ${modelName} works!`);
        return;
      } catch (e) {
        console.log(`FAILED: ${modelName} - ${e.message.split(":")[0]}`);
        // Logging short error to avoid noise
      }
    }
  } catch (error) {
    console.error("Fatal Error:", error);
  }
}

listModels();
