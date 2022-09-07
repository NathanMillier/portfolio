import React, { useEffect, useState } from "react";

const AddProject = ({ technologies, token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  // const [technologies, setTechnologies] = useState([]);
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const [newTechnology, setNewTechnology] = useState("");
  const [appear, setAppear] = useState(false);

  const handleAddProject = async (event) => {
    try {
      event.preventDefault();
      let data;
      const projectResponse = await fetch(
        "http://localhost:3001/api/projects/newProject",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            title,
            description,
            link,
          }),
        }
      );
      data = await projectResponse.json();
      if (data.error) {
        console.log(data.message);
        return;
      }
      setTitle("");
      setDescription("");
      setLink("");

      const projectTechnologiesResponse = await fetch(
        "http://localhost:3001/api/technologies/projectTechnologies",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectId: data.id,
            checkedBoxes,
          }),
        }
      );
    } catch (error) {
      console.error("Couldnt add project");
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

  const createNewTechnology = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/technologies/newTechnology",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newTechnology,
          }),
        }
      );
      const data = await response.json();
      setNewTechnology("");
      console.log(data);
    } catch (error) {
      console.error("couldnt create a new technology");
      throw error;
    }
  };

  // useEffect(() => {
  //   fetchAllTechnologies();
  // }, [technologies]);

  return (
    <div className="add-project-container">
      <form className="add-project-form" onSubmit={handleAddProject}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Link:</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div>
          <ul className="technology-list">
            {technologies.map((technology) => {
              return (
                <li key={technology.id}>
                  <input
                    type="checkbox"
                    name={technology.name}
                    value={technology.id}
                    onChange={handleCheckBoxes}
                  />
                  <label>{technology.name}</label>
                </li>
              );
            })}
          </ul>
          <button type="button" onClick={() => setAppear(!appear)}>
            new technology
          </button>
          {appear ? (
            <div className="add-new-technology">
              <input
                type="text"
                name={newTechnology}
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
              />
              <button type="button" onClick={createNewTechnology}>
                add
              </button>
            </div>
          ) : null}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProject;
