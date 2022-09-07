require("dotenv").config();
const express = require("express");
const server = express();
const JWT = require("jsonwebtoken");
const apiRouter = require("./api");
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const { getUserById } = require("./db/user");

server.use(cors());
server.use(express.json());

server.use(async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next();
    }

    const auth = req.headers.authorization.split(" ")[1];
    const _user = await JWT.decode(auth, process.env.JWT_SECRET);
    if (!_user) {
      return next();
    }
    const user = await getUserById(_user.id);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
});

server.use("/api", apiRouter);

server.use(({ name, message }, req, res, next) => {
  res.status(400).send({ name, message });
});

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
