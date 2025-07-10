const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const { transformText } = require("./services/aiService");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/transform", async (req, res) => {
  const { text, mode } = req.body;

  if (!text || !mode) {
    return res.status(400).json({ error: "Text and mode are required" });
  }

  try {
    const result = await transformText(text, mode);
    res.json({ result });
  } catch (err) {
    console.error("❌ Backend error:", err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = 5500;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
