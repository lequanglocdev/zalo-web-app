const router = require("express").Router();
const {
  createChat,
  findUserChat,
  findChat,
} = require("../controllers/chatController");

router.post("/", createChat);
router.post("/:userId", findUserChat);
router.post("/find/:firstId/:secondId", findChat);

module.exports = router;
