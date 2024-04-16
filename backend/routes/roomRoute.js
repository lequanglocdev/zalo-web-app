const roomController = require("../controllers/roomController");
const upload = require("../upload/upload");

const router = require("express").Router();

router.get("/get-by-user/:id", roomController.getRoomByUser);
router.post(
  "/create-group",
  upload.single("image"),
  roomController.createGroup
);
router.post("/create-group-mobile", roomController.createGroupMobile);

module.exports = router;
