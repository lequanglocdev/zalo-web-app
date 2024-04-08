const roomController = require("../controllers/roomController");

const router = require("express").Router();

router.get("/get-by-user/:id", roomController.getRoomByUser);

module.exports = router;
