import React from "react";
import LoginForm from "./components/LoginForm";

const Login = ({ token, setToken }) => {
  return (
    <div className="content-container">
      <h1 className="main-title">Login</h1>
      <LoginForm token={token} setToken={setToken} />
    </div>
  );
};

export default Login;
