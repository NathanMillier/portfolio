import React from "react";
import AddProject from "./components/AddProject";
import UpdateProject from "./components/UpdateProject";

const Admin = ({ projects, technologies, token }) => {
  return (
    <div className="content-container">
      <div className="two-forms-container">
        <AddProject technologies={technologies} token={token} />
        <UpdateProject
          projects={projects}
          technologies={technologies}
          token={token}
        />
      </div>
    </div>
  );
};

export default Admin;
