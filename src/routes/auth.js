const { authenticateUser } = require("../queries");

const authRoutes = (router) => {
  router.post("/auth", authenticateUser);
};

module.exports = authRoutes;
