const messageController = require("../controllers/messageController");

const router = require("express").Router();

router.get("/get-by-room/:id", messageController.getByRoom);

module.exports = router;
