require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

async function adminMiddleware(req, res, next) {
  const jsonToken = req.headers.authorization;

  const word = jsonToken.split(" ");

  const token = word[1];
  const decodedOutput = jwt.verify(token, secret);
  try {
    if (decodedOutput.username) {
      req.username = decodedOutput.username;
      next();
    }
  } catch (e) {
    res.statue(401).json({
      msg: "invalid token",
    });
  }
}

module.exports = adminMiddleware;
