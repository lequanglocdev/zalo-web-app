const jwt = require("jsonwebtoken");

const generateAccessToken = (user) =>
  jwt.sign(
    {
      _id: user._id,
      phone: user.phone,
    },
    process.env.JWT_ACCESS_KEY,
    {
      expiresIn: process.env.JWT_ACCESS_EXP,
    }
  );

module.exports = { generateAccessToken };
