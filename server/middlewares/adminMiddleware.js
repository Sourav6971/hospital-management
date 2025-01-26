require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

async function adminMiddleware(req, res, next) {
  const jsonToken = req.headers.authorization;
  try {
    const word = jsonToken.split(" ");

    const token = word[1];
    const decodedOutput = jwt.verify(token, secret);
    try {
      if (decodedOutput.username) {
        req.username = decodedOutput.username;
        next();
      }
    } catch (e) {
      res.status(401).json({
        msg: "invalid token",
      });
    }
  } catch (e) {
    res.status(403).json({
      err: "Not authenticated",
    });
  }
}

module.exports = adminMiddleware;
