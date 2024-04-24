const router = require("express").Router();
const {
  verificationUpdate,
  findUser,
  getUsers,
  find,
  sendRequestAddFriend,
  refuseRequest,
  acceptRequest,
  unFriend,
} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifyToken");
const { authenticateJWT } = require("../middlewares/authenticateJWT");
const {
  updateUser,
  updateUserMobile,
  updateAvatarMobile,
} = require("../controllers/updateUser");

router.post("/verification", verificationUpdate);
router.get("/find/:userId", findUser);
router.get("/find", find);
router.get("/", getUsers);
router.post("/send-request-add-friend", sendRequestAddFriend);
router.post("/refuse-request", refuseRequest);
router.post("/accept-request", acceptRequest);
router.post("/unfriend", authenticateJWT, unFriend);
router.post("/update", authenticateJWT, updateUser);
router.put("/update-mobile/:id", updateUserMobile);
router.put("/update-avatar-mobile/:id", updateAvatarMobile);

module.exports = router;
