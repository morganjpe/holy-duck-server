const jwt = require("jsonwebtoken");

const jwtAuthorisationMiddleware = (req, res, next) => {
  const token = req.header("token");

  if (!token) return res.status(401).send({ error: "Access Denied" });
  const decoded = jwt.verify(token, process.env.JWT);
  req.user = decoded;
  next();
  try {
  } catch (error) {
    console.error(error.message);
  }
};

var cors = function (req, res, next) {
  var whitelist = [
    "http://localhost:3000",
    "https://holyduck-8ecjz.ondigitalocean.app/",
  ];
  console.log(res);
  var origin = req.headers.origin;
  if (whitelist.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
};

module.exports = {
  jwtAuthorisationMiddleware,
  cors,
};
