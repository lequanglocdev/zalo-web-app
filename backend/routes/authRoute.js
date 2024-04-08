const router = require("express").Router()
const { userRegister, userLogin, userLogout ,} = require("../controllers/authController")
const { verifyToken } = require("../middlewares/verifyToken")

router.post("/register", userRegister)
router.post("/login", userLogin)
router.post("/logout", verifyToken, userLogout)

module.exports = router