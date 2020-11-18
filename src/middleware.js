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

module.exports = {
  jwtAuthorisationMiddleware,
};
