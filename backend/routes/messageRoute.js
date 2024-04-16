const messageController = require("../controllers/messageController");
const upload = require("../upload/upload");

const router = require("express").Router();

router.get("/get-by-room/:id", messageController.getByRoom);
router.post(
  "/send-file",
  upload.array("information"),
  messageController.sendMessage
);
router.post("/send-file-mobile", messageController.sendFileMessageMobile);

module.exports = router;
