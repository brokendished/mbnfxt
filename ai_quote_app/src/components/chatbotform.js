import React from "react";
import "./ChatbotForm.css";

const ChatbotForm = () => {
  return (
    <div className="container">
      <h1>AI Quote Assistant</h1>
      <form className="quote-form">
        <textarea placeholder="Describe the issue" />
        <input type="file" />
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <button type="submit">Send to Contractor</button>
      </form>
    </div>
  );
};

export default ChatbotForm;
