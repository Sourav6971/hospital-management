const { Router } = require("express");
const { Admin } = require("../db/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const router = Router();

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const response = await Admin.findOne({
    username,
  });
  if (response) {
    res.json({
      msg: "Admin already exists",
    });
  } else {
    const newAdmin = await Admin.create({
      username,
      password,
    });
    res.status(200).json({
      newAdmin,
    });
  }
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const admin = Admin.findOne({
    username,
    password,
  });
  if (admin) {
    const token = jwt.sign({ username }, secret);
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      msg: "Wrong email or password",
    });
  }
});

module.exports = router;
