const express = require("express");
const contactRouter = express.Router();
const nodemailer = require("nodemailer");

const contactEmail = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("ready to send");
  }
});

contactRouter.post("/", (req, res) => {
  const { name, email, message } = req.body;

  const mail = {
    sender: email,
    to: "nathan.millier@hotmail.com",
    subject: "Contact",
    html: `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
      `,
  };

  contactEmail.sendMail(mail, (error, info) => {
    if (error) {
      res.send({ status: "ERROR" });
      console.log(error);
    } else {
      res.send({ status: "Message sent" });
      console.log(info.response);
    }
  });
});

contactRouter.use("/", (req, res, next) => {
  res.send("contact router working");
});

module.exports = contactRouter;
