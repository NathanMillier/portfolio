const express = require("express");
const {
  addTechnologyToProject,
  getAllTechnologiesByProjectId,
} = require("../db/project_technologies");
const { getTechnologies, addTechnology } = require("../db/technologies");

const technologiesRouter = express.Router();

technologiesRouter.get("/", async (req, res, next) => {
  try {
    const technologies = await getTechnologies();
    res.send(technologies);
  } catch (error) {
    console.error("Error getting technologies in api...");
    throw error;
  }
});

technologiesRouter.post("/projectTechnologies", async (req, res, next) => {
  try {
    const { projectId, checkedBoxes } = req.body;
    for (let i = 0; i < checkedBoxes.length; i++) {
      const technologyAdded = await addTechnologyToProject({
        projectId,
        technologyId: checkedBoxes[i],
      });
      console.log(
        "Project id: " +
          projectId +
          "Technologyu that was added: " +
          technologyAdded
      );
    }
    // const response = await addTechnologyToProject()
  } catch (error) {
    console.log("Error adding the project's technologies in API");
    throw error;
  }
});

technologiesRouter.post("/newTechnology", async (req, res, next) => {
  try {
    const technologyToAdd = await addTechnology(req.body);
    res.send(technologyToAdd);
  } catch (error) {
    console.error("Couldnt add new technology in API");
    throw error;
  }
});

technologiesRouter.get("/:id", async (req, res, next) => {
  try {
    const response = await getAllTechnologiesByProjectId(req.params.id);
    res.send(response);
  } catch (error) {
    console.error("Error getting technologies");
  }
});

technologiesRouter.use(() => {
  console.log("technologiesRouter workings!");
});

module.exports = technologiesRouter;
