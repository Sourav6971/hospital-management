const { Router } = require("express");
const { Admin } = require("../db/index");
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

module.exports = router;
