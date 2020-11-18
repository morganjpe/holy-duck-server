const jwt = require("jsonwebtoken");

module.exports = jtwGenerator = (userID) => {
  return jwt.sign(
    {
      user: {
        id: userID,
      },
    },
    process.env.JWT,
    { expiresIn: "1h" }
  );
};
