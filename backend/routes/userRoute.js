const router = require("express").Router();
const {
  verificationUpdate,
  findUser,
  getUsers,
  find,
  sendRequestAddFriend,
  refuseRequest,
  acceptRequest,
} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/verification", verificationUpdate);
router.get("/find/:userId", findUser);
router.get("/find", find);
router.get("/", getUsers);
router.post("/send-request-add-friend", sendRequestAddFriend);
router.post("/refuse-request", refuseRequest);
router.post("/accept-request", acceptRequest);

module.exports = router;
