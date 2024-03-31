const router = require("express").Router()
const { verificationUpdate } = require("../controllers/userController")
const { verifyToken } = require("../middlewares/verifyToken")

router.post("/verification", verificationUpdate)

module.exports = router