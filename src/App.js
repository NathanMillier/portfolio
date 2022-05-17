import React from "react";
import Contact from "./Contact";
import Projects from "./Projects";
import Navbar from "./components/Navbar";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Contact />} path="/Contact" />
        <Route element={<Projects />} path="Projects" />
      </Routes>
    </div>
  );
}

export default App;
