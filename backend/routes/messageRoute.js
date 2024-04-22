const messageController = require("../controllers/messageController");
const upload = require("../upload/upload");
const { verifyToken } = require("../middlewares/verifyToken")
const { authenticateJWT } = require("../middlewares/authenticateJWT")

const router = require("express").Router();

router.get("/get-by-room/:id", messageController.getByRoom);
router.post(
  "/send-file",
  upload.array("information"),
  messageController.sendMessage
);
router.post("/send-file-mobile", messageController.sendFileMessageMobile);
router.post("/disableMessage", messageController.disableMessage)

module.exports = router;
