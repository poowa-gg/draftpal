import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("formal");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTransform = async () => {
    if (!text) return alert("Please enter some text first");

    setLoading(true);
    setResult("");
    setCopied(false);

    try {
      const res = await axios.post("http://localhost:5500/api/transform", {
        text,
        mode,
      });
      setResult(res.data.result);
    } catch (err) {
      console.error("API error:", err);
      setResult("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // reset after 2 seconds
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "2rem" }}>
      <h1>🧠 DraftPal – GenAI Text Assistant</h1>

      <textarea
        rows={8}
        style={{ width: "100%", fontSize: "1rem", padding: "0.5rem" }}
        placeholder="Paste or type your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        style={{ marginTop: "1rem", padding: "0.5rem", width: "100%" }}
      >
        <option value="formal">Formal Tone</option>
        <option value="casual">Casual Tone</option>
        <option value="summary">Summarize</option>
        <option value="grammar">Fix Grammar</option>
        <option value="translate">Translate to French</option>
      </select>

      <br />
      <button
        onClick={handleTransform}
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1rem",
          backgroundColor: "#222",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        🚀 Transform
      </button>

      {loading && <p style={{ color: "blue", marginTop: "1rem" }}>⏳ Thinking...</p>}

      {result && (
        <>
          <h3>Result:</h3>
          <div
            style={{
              background: "#f1f1f1",
              padding: "1rem",
              whiteSpace: "pre-wrap",
              borderRadius: "5px",
              fontSize: "1rem",
            }}
          >
            {result}
          </div>

          <button
            onClick={handleCopy}
            style={{
              marginTop: "0.5rem",
              padding: "0.4rem 0.8rem",
              backgroundColor: "#0a0",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            {copied ? "✅ Copied!" : "📋 Copy"}
          </button>
        </>
      )}
    </div>
  );
}

export default App;
