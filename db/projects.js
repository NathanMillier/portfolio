const client = require("./");

const getProjects = async () => {
  try {
    const response = await client.query(`
        SELECT * FROM projects;
      `);
    return response.rows;
  } catch (error) {
    console.error("Error getting the projects...");
    throw error;
  }
};

const getProjectById = async (projectId) => {
  try {
    const response = await client.query(
      `
            SELECT * FROM projects
            WHERE id = $1;
        `,
      [projectId]
    );
    return response.rows[0];
  } catch (error) {
    console.error("Error getting the project");
    throw error;
  }
};

const createProject = async ({ title, description, link }) => {
  try {
    const response = await client.query(
      `
                INSERT INTO projects(title, description, link)
                VALUES ($1, $2, $3)
                RETURNING *;
            `,
      [title, description, link]
    );
    return response.rows[0];
  } catch (error) {
    console.error("Error creating the project...");
    throw error;
  }
};

const updateProject = async ({ id, title, description, link }) => {
  try {
    if (id) {
      if (title) {
        await client.query(
          `
        UPDATE projects
        SET title = $1
        WHERE id = $2
      `,
          [title, id]
        );
      }

      if (description) {
        await client.query(
          `
        UPDATE projects
        SET description = $1
        WHERE id = $2
      `,
          [description, id]
        );
      }

      if (link) {
        await client.query(
          `
        UPDATE projects
        SET link = $1
        WHERE id = $2
      `,
          [link, id]
        );
      }

      const response = await client.query(
        `
        SELECT * FROM projects
        WHERE id = $1
      `,
        [id]
      );
      return response.rows[0];
    }
  } catch (error) {
    console.log("Error updating project in db");
    throw error;
  }
};

module.exports = {
  getProjectById,
  createProject,
  getProjects,
  updateProject,
};
