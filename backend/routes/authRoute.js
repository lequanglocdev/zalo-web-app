const router = require("express").Router();
const {
  userRegister,
  userLogin,
  userLogout,
  forgetPassword,
  resetPassword,
} = require("../controllers/authController");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout", verifyToken, userLogout);
router.post("/forgetPassword", forgetPassword);
router.put("/resetPassword", resetPassword);
module.exports = router;
