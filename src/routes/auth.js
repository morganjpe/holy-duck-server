const { authenticateUser } = require("../queries");
const { jwtAuthorisationMiddleware } = require("../middleware");

const authRoutes = (router) => {
  router.post("/authenticate", authenticateUser);
  router.get("/authorise", jwtAuthorisationMiddleware, (req, res) => {
    console.log(req.user);
    res.send(req.user);
  });
};

module.exports = authRoutes;
