const express = require("express");
const apiRouter = express.Router();
const contactRouter = require("./contactRouter");
const projectsRouter = require("./projectsRouter");
const technologiesRouter = require("./technologiesRouter");
const userRouter = require("./userRouter");

apiRouter.use("/contact", contactRouter);
apiRouter.use("/projects", projectsRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/technologies", technologiesRouter);

apiRouter.get("/", (req, res) => {
  res.send("api router working");
});

module.exports = apiRouter;
