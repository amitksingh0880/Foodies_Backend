// Routes/User.routes.js
const express = require("express");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Models/User.models.js");

UserRouter.get("/", (req, res) => {
  res.send("Working Fine");
});

UserRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password, location } = req.body;
    const hash = await bcrypt.hash(password, 5);
    const user = new UserModel({ name, email, password: hash, location });
    await user.save();
    res.send({
      message: "User Created",
      status: 1,
    });
  } catch (error) {
    res.send({
      message:error.message,
      status: 0,
    });
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let option = {
    expiresIn: "10m",
  };
  try {
    let data = await UserModel.find({ email });
    if (data.length > 0) {
      let token = jwt.sign({ userId: data[0]._id }, "Foodies", option);
      bcrypt.compare(password, data[0].password, async function (err, result) {
        if (err)
          return res.send({
            message: "Something went wrong:" + err,
            status: 0,
          });
        if (result) {
          res.send({
            message: "User loggedIn Successfully",
            token: token,
            status: 1,
          });
        } else {
          res.send({
            message: "Invalid Password",
            status: 0,
          });
        }
      });
    } else {
      res.send({
        message: "User does not exist",
        status: 0,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});

module.exports = { UserRouter };
