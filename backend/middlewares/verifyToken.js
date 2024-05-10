const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401).json("You're not authenticated");

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
    console.log("decoded: ", decoded);
    
    req._id = decoded._id   // của updeta
    req.phone = decoded.phone;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(403).json("Token is not valid!");
  }
};

module.exports = { verifyToken };
