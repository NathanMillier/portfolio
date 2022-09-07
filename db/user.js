const client = require("./");
const bcrypt = require("bcrypt");

const createUser = async ({ username, password, admin = false }) => {
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const response = await client.query(
      `
            INSERT INTO users (username, password, admin)
            VALUES ($1, $2, $3)
            RETURNING*;
        `,
      [username, hashPassword, admin]
    );
    // console.log(response.rows);
    delete response.rows[0].password;
    return response.rows[0];
  } catch (error) {
    console.error("Error creating user in db");
    throw error;
  }
};

const getUser = async ({ username, password }) => {
  try {
    // console.log(username);
    const user = await client.query(
      `
            SELECT * FROM users
            WHERE username = $1;
        `,
      [username]
    );
    if (!user.rows.length) {
      return { errorName: "noUser", message: "User does not exists" };
    } else {
      const hashPassword = user.rows[0].password;
      const passwordsMatch = await bcrypt.compare(password, hashPassword);
      if (passwordsMatch) {
        delete user.rows[0].password;
        return user.rows[0];
      } else {
        return { errorName: "loginError", message: "Incorrect credentials" };
      }
    }
  } catch (error) {
    console.error("Error getting user in db...");
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const response = await client.query(
      `
      SELECT * FROM users
      WHERE id = $1
    `,
      [userId]
    );

    return response.rows[0];
  } catch (error) {
    console.error("Error getting user by ID in db...");
    throw error;
  }
};

module.exports = {
  createUser,
  getUser,
  getUserById,
};
