require("dotenv").config();
const client = require("./");
const { addTechnology } = require("./technologies");
const { createProject } = require("./projects");
const { createUser } = require("./user");
const { addTechnologyToProject } = require("./project_technologies");

const seedDB = async () => {
  // console.log(process.env, "PORUT");
  await dropTables();
  await createTables();
  await createInitialTechnologies();
  await createInitialProjects();
  await createInitialUser();
  await createInitialProjectTechnologies();
};

const dropTables = async () => {
  console.log("Starting to drop tables...");
  try {
    await client.query(`
        DROP TABLE IF EXISTS project_technologies;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS projects;
        DROP TABLE IF EXISTS technologies;
    `);
    console.log("Finish dropping tables...");
  } catch (error) {
    console.error("Error dropping tables...");
    throw error;
  }
};

const createTables = async () => {
  console.log("Starting to create tables...");
  try {
    await client.query(`

            CREATE TABLE users(
              id SERIAL PRIMARY KEY,
              username VARCHAR(255) UNIQUE NOT NULL,
              password VARCHAR(255) NOT NULL,
              admin BOOLEAN NOT NULL
            );

            CREATE TABLE projects(
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) UNIQUE NOT NULL,
                description TEXT NOT NULL,
                link TEXT NOT NULL
            );

            CREATE TABLE technologies(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL
            );

            CREATE TABLE project_technologies(
              id SERIAL PRIMARY KEY,
              "projectId" INTEGER REFERENCES projects(id),
              "technologyId" INTEGER REFERENCES technologies(id),
              UNIQUE ("projectId", "technologyId")
            )
        `);
    console.log("Finished creating tables...");
  } catch (error) {
    console.error("Error creating tables...");
    throw error;
  }
};

const createInitialUser = async () => {
  console.log("Starting to create initial user...");
  try {
    const userToCreate = [
      {
        username: process.env.USER_USERNAME,
        password: process.env.USER_PASSWORD,
        admin: true,
      },
      {
        username: "visitor",
        password: "password",
      },
    ];

    const user = await Promise.all(userToCreate.map(createUser));
    // console.log("User created: ", user);
    console.log("Finished creating initial user...");
  } catch (error) {
    console.error("Error creating initial user...");
    throw error;
  }
};

const createInitialTechnologies = async () => {
  console.log("Starting to create initial technologies...");
  try {
    const technologiesToCreate = [
      {
        newTechnology: "Javascript",
      },
      {
        newTechnology: "HTML",
      },
      {
        newTechnology: "CSS",
      },
    ];

    const technologies = await Promise.all(
      technologiesToCreate.map(addTechnology)
    );
    // console.log("technologies created: ", technologies);
    console.log("Finished creating technologies...");
  } catch (error) {
    console.error("Error creating initial technologies...");
    throw error;
  }
};

const createInitialProjects = async () => {
  console.log("Starting to create initial project...");
  try {
    const projectsToCreate = [
      {
        title: "Fitness-Tracker",
        description: `Fitness tracker is a fullstack application buil with a PERN stack. Built within a team of 4, the application allows a non logged-in user to browse a list of routines created by other users. Each routine features different activities, which each have "counts" or "duration". The user also has the ability to register and login to be able to create it's own routines and activities for other users to browse.`,
        link: "https://admirable-scone-ceb0e7.netlify.app/",
      },
      {
        title: "Tic-Tac-Toe",
        description:
          "Tic-Tac-Toe is, as you could have guessed, an application built in vanilla JavaScript that lets a user play the famous game. Pick a game-mode, 1 or 2 players, enter the contestants' names, and get ready to play! As a single player round, the user plays each turn while the computer will generate a random shot within the spots left. As a double player round, eacher player will select their names and play one at a time until X or O wins, or it's a tie...",
        link: "https://loving-swanson-1db3f3.netlify.app/",
      },
    ];

    const projects = await Promise.all(projectsToCreate.map(createProject));
    // console.log("projects created: ", projects);
    console.log("Finished creating initial projects...");
  } catch (error) {
    console.log("Error creating initial project...");
    throw error;
  }
};

const createInitialProjectTechnologies = async () => {
  try {
    const technologiesToAddToProject = [
      {
        projectId: 1,
        technologyId: 1,
      },
      {
        projectId: 1,
        technologyId: 2,
      },
      {
        projectId: 1,
        technologyId: 3,
      },
      {
        projectId: 2,
        technologyId: 1,
      },
      {
        projectId: 2,
        technologyId: 2,
      },
    ];

    const technologies = await Promise.all(
      technologiesToAddToProject.map(addTechnologyToProject)
    );
    console.log("tech on projects: " + technologies);
  } catch (error) {
    console.error("Error creating initial project's technologies...");
    throw error;
  }
};

seedDB();
