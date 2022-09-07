import ProjectCard from "./components/ProjectCard";

const Projects = ({ projects, technologies }) => {
  return (
    <div className="content-container">
      <h1 className="main-title">My Projects</h1>
      <div className="projects-container">
        <ProjectCard projects={projects} technologies={technologies} />
      </div>
    </div>
  );
};

export default Projects;
