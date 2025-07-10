const axios = require("axios");
require("dotenv").config();

console.log("🔐 Groq API Key Loaded:", process.env.GROQ_API_KEY ? "YES" : "NO");

exports.transformText = async (text, mode) => {
  console.log("📝 Text:", text);
  console.log("🧠 Mode:", mode);

  const prompts = {
    formal: "Rewrite the following sentence in a formal tone:",
    casual: "Rewrite the following casually:",
    summary: "Summarize the following text in 3 bullet points:",
    grammar: "Fix grammar and awkward expressions in the following:",
    translate: "Translate the following into French:"
  };

  const systemPrompt = prompts[mode] || "Improve the clarity of the following text:";
  const userPrompt = `${systemPrompt}\n\n"${text}"`;

  try {
    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192", // ✅ NEW Groq model
        messages: [
          { role: "system", content: "You are a helpful, multilingual writing assistant." },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = res.data.choices[0].message.content.trim();
    console.log("✅ Groq response:", reply);
    return reply;

  } catch (error) {
    console.error("❌ Groq API Error:", error.response?.data || error.message);
    throw new Error("Groq request failed");
  }
};
