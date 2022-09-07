import React, { useState } from "react";
import { useNavigate } from "react-router";

const LoginForm = ({ token, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch("http://localhost:3001/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        history("/");
      }
      if (data.errorName) {
        setError(data.errorName);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin} className="contact-form">
        <div className="text-field">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <span></span>
          <label className="label">Username</label>
        </div>
        <div className="text-field">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span></span>
          <label>Password</label>
        </div>

        <button type="submit" className="send-button">
          Login
        </button>
        <p>{error}</p>
      </form>
    </div>
  );
};

export default LoginForm;
