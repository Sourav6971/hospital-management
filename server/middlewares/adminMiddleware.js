const { Admin } = require("../db");

async function adminMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;

  const response = await Admin.findOne({
    username,
  });
  if (response) {
    if (response.password === password) {
      next();
    } else {
      res.status(401).json({
        msg: "wrong password",
      });
    }
  } else {
    res.status(401).json({
      msg: "admin does not exists",
    });
  }
}

module.exports = adminMiddleware;
