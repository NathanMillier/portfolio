const client = require("./");

const getTechnologies = async () => {
  try {
    const response = await client.query(`
        SELECT * FROM technologies;
    `);
    return response.rows;
  } catch (error) {
    console.error("Error getting the technologies...");
    throw error;
  }
};

const getTechnologyById = async (technologyId) => {
  const response = await client.query(
    `
        SELECT * FROM technologies
        WHERE id = $1;
    `,
    [technologyId]
  );
  return response.rows;
};

const addTechnology = async ({ newTechnology }) => {
  try {
    const response = await client.query(
      `
            INSERT INTO technologies(name)
            VALUES($1)
            RETURNING*;
        `,
      [newTechnology]
    );
    return response.rows[0];
  } catch (error) {
    console.error("Error adding the technology...");
    throw error;
  }
};

module.exports = {
  getTechnologies,
  getTechnologyById,
  addTechnology,
};
