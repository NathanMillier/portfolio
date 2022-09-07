import React from "react";
import { ExternalLink } from "react-external-link";

import ProjectsContext from "../App";

const ProjectCard = ({ projects }) => {
  return (
    <>
      {projects.map((project) => {
        return (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <h4>The different technologies used during this project:</h4>
            <ul>
              {project.technologies.map((technology) => {
                return <li>{technology.name}</li>;
              })}
            </ul>
            <h4>
              <ExternalLink href={project.link}>{project.link}</ExternalLink>
            </h4>
          </div>
        );
      })}
    </>
  );
};

export default ProjectCard;
