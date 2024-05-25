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
router.delete("/:id", roomController.deleteRoom);
router.post("/add-depute", roomController.addDepute);
router.post("/remove-depute", roomController.removeDepute);
router.post("/add", roomController.add);
router.post("/kick", roomController.kick);
router.post("/leave", roomController.leave);

module.exports = router;
