const jwt = require("jsonwebtoken");


const authenticateJWT = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Bạn chưa được xác thực" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
    console.log("decoded: ", decoded)
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = {  authenticateJWT}
