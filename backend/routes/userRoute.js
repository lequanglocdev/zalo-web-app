const router = require("express").Router();
const multer = require("multer");
const upload = multer();
const {
  verificationUpdate,
  findUser,
  getUsers,
  find,
  sendRequestAddFriend,
  refuseRequest,
  acceptRequest,
  unFriend,
  getFriendRequests,
  getFullInformationUsers,
} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifyToken");
const { authenticateJWT } = require("../middlewares/authenticateJWT");
const {
  updateUser,
  updateUserMobile,
  updateAvatarMobile,
  updateAvatar,
} = require("../controllers/updateUser");

router.post("/verification", verificationUpdate);
router.get("/find/:userId", findUser);
router.get("/find", find);
router.get("/", getUsers);
router.post("/send-request-add-friend", sendRequestAddFriend);
router.post("/refuse-request", refuseRequest);
router.post("/accept-request", acceptRequest);
router.post("/unfriend", unFriend);

router.post("/update", authenticateJWT, updateUser);
router.post("/updateAvatar/:id", upload.single("image"), updateAvatar);

router.put("/update-mobile/:id", updateUserMobile);
router.put("/update-avatar-mobile/:id", updateAvatarMobile);
router.get("/friend-requests/:userId", getFriendRequests);
router.post("/get-full-information-user", getFullInformationUsers);

module.exports = router;
