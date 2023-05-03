const jwt = require("jsonwebtoken");
const { revokedTokens } = require("../controller/user_controller");

const validationToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    if (revokedTokens.has(token)) {
      res.status(401).send("Token has been revoked");
      return;
    }
    jwt.verify(token, process.env.SECRATE_KEY, (err, decoded) => {
      if (err) {
        res.status(401);
        res.send("User is not authorized Please Login");
      } else {
        req.user = decoded.user;
        next();
      }
    });

    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
};
module.exports = validationToken;
