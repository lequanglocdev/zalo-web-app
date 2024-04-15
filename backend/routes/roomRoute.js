const roomController = require("../controllers/roomController");
const upload = require("../upload/upload");

const router = require("express").Router();

router.get("/get-by-user/:id", roomController.getRoomByUser);
router.post(
  "/create-group",
  upload.single("image"),
  roomController.createGroup
);

module.exports = router;
