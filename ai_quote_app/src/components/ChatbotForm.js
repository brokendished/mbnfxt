import React, { useState } from 'react';
import axios from 'axios';

const ChatbotForm = () => {
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handlePhotoUpload = (e) => {
    setPhotos([...e.target.files]);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/sendQuote', {
        description,
        photos,
        name,
        email,
      });

      if (response.status === 200) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error sending quote", error);
    }
  };

  return (
    <div>
      <textarea
        placeholder="Describe the issue"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handlePhotoUpload}
      />
      <input
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Send to Contractor</button>

      {submitted && <div>Quote Summary Sent!</div>}
    </div>
  );
};

export default ChatbotForm;