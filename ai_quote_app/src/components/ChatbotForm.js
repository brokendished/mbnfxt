import React, { useState } from "react";
import "./ChatbotForm.css";

const ChatbotForm = () => {
  const [formData, setFormData] = useState({
    description: "",
    name: "",
    email: "",
    file: null
  });

  const [preview, setPreview] = useState(null);
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((f) => ({ ...f, file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setResponseMsg("⏳ Sending to contractor…");

    const data = new FormData();
    data.append("description", formData.description);
    data.append("name", formData.name);
    data.append("email", formData.email);
    if (formData.file) data.append("file", formData.file);

    try {
      const res = await fetch("/api/sendQuote", {
        method: "POST",
        body: data
      });

      if (res.ok) {
        setResponseMsg("✅ Sent! A contractor will be in touch soon.");
        setFormData({ description: "", name: "", email: "", file: null });
        setPreview(null);
      } else {
        setResponseMsg("❌ Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setResponseMsg("❌ Error sending. Try again.");
    }
  };

  return (
    <div className="chatbot-wrapper">
      <div className="chatbot-box">
        <h1>👩‍🔧 AI Quote Assistant</h1>
        <p className="subtitle">Describe your problem, upload a photo, and we'll get a contractor to quote it fast.</p>

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
              style={{ width: "100%", maxWidth: "300px", borderRadius: "12px", marginTop: "10px" }}
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
