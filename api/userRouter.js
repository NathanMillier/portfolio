const express = require("express");
const userRouter = express.Router();
const { getUser } = require("../db/user");
const JWT = require("jsonwebtoken");

// userRouter.get("/me", async (req, res, next) => {
//   try {
//     const id = req.body;
//     const user = await getUserById(id);
//     res.send(user);
//   } catch (error) {
//     console.error("Error getting user by id at userRouter...");
//     throw error;
//   }
// });

userRouter.post("/login", async (req, res, next) => {
  const user = await getUser(req.body);
  try {
    if (user.errorName) {
      res.send(user);
    } else {
      const token = JWT.sign(user, process.env.JWT_SECRET);

      res.send({ token });
    }
  } catch (error) {
    console.log("error");
    next(error);
  }
});

userRouter.get("/me", async (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "no user" });
  }
  res.send(req.user);
});

module.exports = userRouter;
