import React, { useEffect, useState } from "react";
import Contact from "./Contact";
import Projects from "./Projects";
import Navbar from "./components/Navbar";
import Home from "./Home";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Admin from "./Admin";
import Protected from "./components/Protected";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [technologies, setTechnologies] = useState([]);

  const fetchProjects = async () => {
    const response = await fetch("http://localhost:3001/api/projects");
    const data = await response.json();
    setProjects(data);
  };

  const fetchUser = async () => {
    const lsToken = localStorage.getItem("token");

    if (lsToken) setToken(lsToken);

    const response = await fetch("http://localhost:3001/api/user/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lsToken}`,
      },
    });

    const data = await response.json();
    if (!data.error) {
      setUser(data);
    }
  };

  const fetchTechnologies = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/technologies");
      const data = await response.json();
      const finalData = data.map((d) => {
        return { id: d.id, name: d.name };
      });
      setTechnologies(finalData);
    } catch (error) {
      console.error("Couldnt fetch all technologies");
      throw error;
    }
  };

  useEffect(() => {
    fetchUser();
    fetchProjects();
    fetchTechnologies();
  }, [token]);

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} setToken={setToken} />
      <main>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Contact />} path="/Contact" />
          <Route
            element={
              <Projects projects={projects} technologies={technologies} />
            }
            path="/Projects"
          />
          <Route
            element={<Login token={token} setToken={setToken} />}
            path="Login"
          />
          <Route
            path="/Admin"
            element={
              <Protected user={user}>
                <Admin
                  projects={projects}
                  technologies={technologies}
                  token={token}
                />
              </Protected>
            }
          />
          {/* <Route
            element={
              <Admin
                user={user}
                projects={projects}
                technologies={technologies}
              />
            }
            path="/Admin"
          /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
