import React, { useState } from "react";

const ContactForm = () => {
  const [status, setStatus] = useState("Submit");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus("Sending...");
    try {
      const response = await fetch("http://localhost:3001/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });
      setStatus("Submit");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("ERR");
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="text-field">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <span></span>
          <label className="label">Name</label>
        </div>
        <div className="text-field">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span></span>
          <label>Email</label>
        </div>
        <div className="text-field">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <span></span>
          <label>Message</label>
        </div>
        <button type="submit" className="send-button">
          {status}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
