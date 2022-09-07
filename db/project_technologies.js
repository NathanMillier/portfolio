const client = require("./");

const addTechnologyToProject = async ({ projectId, technologyId }) => {
  try {
    const response = await client.query(
      `
        INSERT INTO project_technologies ("projectId", "technologyId")
        VALUES ($1, $2)
        RETURNING*;
    `,
      [projectId, technologyId]
    );
    return response.rows[0];
  } catch (error) {
    console.error("Error adding technology to project in db...");
    throw error;
  }
};

const getAllTechnologiesByProjectId = async (projectId) => {
  try {
    const response = await client.query(
      `
        SELECT
          technologies.id,
          technologies.name,
          project_technologies.id as "project_technologies_id"
        FROM project_technologies
        JOIN technologies ON technologies.id = project_technologies."technologyId"
        WHERE "projectId" = $1;
    `,
      [projectId]
    );

    return response.rows;
  } catch (error) {
    console.error("Error getting all project's technologies in db...");
    throw error;
  }
};

module.exports = {
  addTechnologyToProject,
  getAllTechnologiesByProjectId,
};
