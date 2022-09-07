import React from "react";
import { Navigate } from "react-router";

const Protected = ({ user, children }) => {
  if (!user) return <Navigate to="/" replace />;
  return children;
};

export default Protected;
