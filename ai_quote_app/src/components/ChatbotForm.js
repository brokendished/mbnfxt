import React from "react";
import "./ChatbotForm.css";

const ChatbotForm = () => {
  return (
    <div className="chatbot-wrapper">
      <div className="chatbot-box">
        <h1>👩‍🔧 AI Quote Assistant</h1>
        <p className="subtitle">Describe your problem, upload a photo, and we'll get a contractor to quote it fast.</p>
        <form className="chatbot-form">
          <textarea placeholder="Hey there! What's going on with your dishwasher?" />
          <input type="file" />
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <button type="submit">📤 Send to Contractor</button>
        </form>
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
