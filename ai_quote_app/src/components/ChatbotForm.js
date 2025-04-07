import React, { useState } from "react";
import "./ChatbotForm.css";

const ChatbotForm = () => {
  const [formData, setFormData] = useState({
    description: "",
    name: "",
    email: "",
    file: null,
  });

  const [preview, setPreview] = useState(null);
  const [responseMsg, setResponseMsg] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((f) => ({ ...f, file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg("⏳ Sending to contractor…");
    setAiResponse("");
    setIsThinking(true);

    const data = new FormData();
    data.append("description", formData.description);
    data.append("name", formData.name);
    data.append("email", formData.email);
    if (formData.file) data.append("file", formData.file);

    try {
      const res = await fetch("/api/sendQuote", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setResponseMsg("✅ Sent!");
        setFormData({ description: "", name: "", email: "", file: null });
        setPreview(null);

        // ✨ Fake AI reply
        setTimeout(() => {
          const msg = generateFakeAiReply(formData.description);
          setAiResponse(msg);
          setIsThinking(false);
        }, 1500);
      } else {
        setResponseMsg("❌ Something went wrong.");
        setIsThinking(false);
      }
    } catch (err) {
      console.error(err);
      setResponseMsg("❌ Error sending. Try again.");
      setIsThinking(false);
    }
  };

  // Just a fun little guesser based on keywords
  const generateFakeAiReply = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes("leak")) {
      return "💡 Sounds like a leaky valve or hose. I’ll send this to a contractor for confirmation.";
    } else if (lower.includes("noise") || lower.includes("grinding")) {
      return "🔧 Hmm, that could be a worn-out motor or stuck food. Let’s have someone check it.";
    } else if (lower.includes("won't start") || lower.includes("not turning on")) {
      return "⚠️ That might be electrical — could be the door latch, power, or control board.";
    } else {
      return "📬 Got it! I’ve passed this along to a contractor for a proper quote.";
    }
  };

  return (
    <div className="chatbot-wrapper">
      <div className="chatbot-box">
        <h1>👩‍🔧 AI Quote Assistant</h1>
        <p className="subtitle">
          Describe your problem, upload a photo, and we'll get a contractor to quote it fast.
        </p>

        <form className="chatbot-form" onSubmit={handleSubmit}>
          <textarea
            name="description"
            placeholder="Hey there! What's going on with your dishwasher?"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input type="file" onChange={handleFileChange} accept="image/*" />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                maxWidth: "300px",
                borderRadius: "12px",
                marginTop: "10px",
              }}
            />
          )}
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <button type="submit">📤 Send to Contractor</button>
        </form>

        {responseMsg && <p style={{ marginTop: "1rem", textAlign: "center" }}>{responseMsg}</p>}
        {isThinking && <p style={{ textAlign: "center" }}>🤖 Thinking...</p>}
        {aiResponse && <div className="ai-bubble">{aiResponse}</div>}
      </div>

      <footer className="footer">
        <div className="footer-links">
          <a href="#">Contact</a>
          <a href="#">Terms</a>
          <a href="#">About</a>
        </div>
        <p>&copy; {new Date().getFullYear()} BrokenDishwasher.com</p>
      </footer>
    </div>
  );
};

export default ChatbotForm;
