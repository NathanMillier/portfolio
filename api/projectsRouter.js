const express = require("express");
const projectsRouter = express.Router();
const {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
} = require("../db/projects");
const { getAllTechnologiesByProjectId } = require("../db/project_technologies");
const JWT = require("jsonwebtoken");

projectsRouter.get("/", async (req, res, next) => {
  try {
    const projects = await getProjects();
    const finalProjects = await Promise.all(
      projects.map(async (project) => {
        project.technologies = await getAllTechnologiesByProjectId(project.id);
        return project;
      })
    );
    res.send(finalProjects);
  } catch (error) {
    console.error("Error fetching projects...");
    throw error;
  }
});

projectsRouter.get("/:id", async (req, res, next) => {
  try {
    const response = await getProjectById(req.params.id);
    res.send(response);
  } catch (error) {
    console.error("Error getting project by id in api");
    throw error;
  }
});

projectsRouter.post("/newProject", async (req, res, next) => {
  try {
    const user = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
    console.log(user);
    if (user.admin) {
      const response = await createProject(req.body);
      res.send(response);
    } else {
      res.send({
        error: "NoAuth",
        message: "You are not authorized to perform this request",
      });
    }
  } catch (error) {
    console.error("Error adding project in API");
    throw error;
  }
});

projectsRouter.patch("/updateProject", async (req, res, next) => {
  try {
    const user = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
    if (user.admin) {
      const response = await updateProject(req.body);
      console.log(response);
      res.send(response);
    } else {
      res.send({
        error: "NoAuth",
        message: "You are not authorized to perform this request",
      });
    }
  } catch (error) {
    console.error("Error updating project in API");
    throw error;
  }
});

projectsRouter.use("/", (req, res, next) => {
  console.log("projectsRouter working...");
});

module.exports = projectsRouter;
