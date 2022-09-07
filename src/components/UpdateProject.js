import React, { useEffect, useState } from "react";

const UpdateProject = ({ projects, technologies, token }) => {
  const [current, setCurrent] = useState(projects[0].id);
  const [currentProject, setCurrentProject] = useState({});
  const [currentTechnologies, setCurrentTechnologies] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [checkedBoxes, setCheckedBoxes] = useState([]);

  const fetchCurrentProject = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/projects/${id}`);
      const data = await response.json();
      setTitle(data.title);
      setDescription(data.description);
      setLink(data.link);
      setCurrentProject(data);
    } catch (error) {
      console.error("Couldnt fetch current project");
      throw error;
    }
  };

  const fetchCurrentProjectTechnologies = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/technologies/${id}`
      );
      const data = await response.json();
      let finalTechnologies = [];
      data.forEach((d) => finalTechnologies.push(d.id));
      // console.log(finalTechnologies);
      setCheckedBoxes([...finalTechnologies]);
      setCurrentTechnologies(finalTechnologies);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateProject = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(
        "http://localhost:3001/api/projects/updateProject",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            id: currentProject.id,
            title,
            description,
            link,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        console.log(data.message);
        return;
      }

      // const projectTechnologiesResponse = await fetch(
      //   "http://localhost:3001/api/technologies/projectTechnologies",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       projectId: data.id,
      //       checkedBoxes,
      //     }),
      //   }
      // );
      return;
    } catch (error) {
      console.error("Error updating project");
      throw error;
    }
  };

  const handleCheckBoxes = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setCheckedBoxes([...checkedBoxes, value]);
    } else {
      setCheckedBoxes(checkedBoxes.filter((checkbox) => checkbox !== value));
    }
  };

  useEffect(() => {
    fetchCurrentProject(current);
    fetchCurrentProjectTechnologies(current);
  }, [current]);

  return (
    <div className="update-project-container">
      <form onSubmit={handleUpdateProject}>
        <select
          onChange={(e) => {
            setCurrent(e.target.value);
          }}
        >
          {projects.map((project) => {
            return <option value={project.id}>{project.title}</option>;
          })}
        </select>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div>
          <label htmlFor="link">Link:</label>
          <input
            name="link"
            onChange={(e) => setLink(e.target.value)}
            value={link}
          />
        </div>
        <div>
          <ul>
            {technologies.map((technology) => {
              if (currentTechnologies.includes(technology.id)) {
                return (
                  <li>
                    <input
                      type="checkbox"
                      name={technology.name}
                      value={technology.id}
                      checked="checked"
                      onChange={handleCheckBoxes}
                    />
                    <label>{technology.name}</label>
                  </li>
                );
              } else {
                return (
                  <li>
                    <input
                      type="checkbox"
                      name={technology.name}
                      value={technology.id}
                      onChange={handleCheckBoxes}
                    />
                    <label>{technology.name}</label>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateProject;
