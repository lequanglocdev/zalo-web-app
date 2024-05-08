const User = require("../models/User");
const { use } = require("../routes/authRoute");
const roomController = require("./roomController");
const Room = require("../models/Room");

const verificationUpdate = async (req, res) => {
  const phone = req.body.phone;
  if (!phone)
    return res.sendaStatus(401).json({ error: ["Không tìm thấy SDT - 01"] });

  const user = await User.findOne({ phone: phone }).lean();
  if (!user)
    return res.sendStatus(403).json({ error: ["Không tìm thấy SDT - 02"] });
  try {
    user.verification = true;
    const userUpdated = await User.findByIdAndUpdate(user._id, user, {
      new: true,
    });

    res.status(200).json({
      status: ["Cập nhập thành công"],
    });
  } catch (error) {
    res.sendStatus(403).json({
      error: ["Xác thực không thành công"],
    });
  }
};
const findUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const find = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const sendRequestAddFriend = async (req, res) => {
  try {
    const { fromUser, toUser } = req.body;
    fromUser.friends = [
      ...fromUser.friends,
      {
        _id: false,
        friendId: toUser._id,
        status: "pending",
      },
    ];

    toUser.friends = [
      ...toUser.friends,
      {
        _id: false,
        friendId: fromUser._id,
        status: "request",
      },
    ];

    const userUpdated = await User.findByIdAndUpdate(fromUser._id, fromUser);
    await User.findByIdAndUpdate(toUser._id, toUser);
    return res.status(200).json(userUpdated);
  } catch (error) {
    return res.status(500).json(error.Message);
  }
};

const refuseRequest = async (req, res) => {
  try {
    const { fromUser, toUser } = req.body;
    fromUser.friends = fromUser.friends.filter(
      (item) => item.friendId !== toUser._id
    );
    toUser.friends = toUser.friends.filter(
      (item) => item.friendId !== fromUser._id
    );
    const userUpdated = await User.findByIdAndUpdate(fromUser._id, fromUser);
    await User.findByIdAndUpdate(toUser._id, toUser);
    return res.status(200).json(userUpdated);
  } catch (error) {
    return res.status(500).json(error.Message);
  }
};

const acceptRequest = async (req, res) => {
  try {
    const { fromUser, toUser } = req.body;
  
    fromUser.friends = fromUser.friends.map((item) => {
      if (item.friendId === toUser._id) {
        item.status = "accepted";
        return item;
      } else {
        return item;
      }
    });
    toUser.friends = toUser.friends.map((item) => {
      if (item.friendId === fromUser._id) {
        item.status = "accepted";
        return item;
      } else {
        return item;
      }
    });
    const userUpdated = await User.findByIdAndUpdate(fromUser._id, fromUser);
    await User.findByIdAndUpdate(toUser._id, toUser);
    const room = {
      users: [fromUser._id, toUser._id],
      type: "single",
    };
    await Room.create(room);
    return res.status(200).json(userUpdated);
  } catch (error) {
    return res.status(500).json(error.Message);
  }
};

const unFriend = async (req, res) => {
  try {
    const { fromUser, toUser } = req.body
    console.log(fromUser)
    const userUpdated = await User.findByIdAndUpdate(
      fromUser._id,
      { $pull: { friends: { friendId: toUser._id } } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      toUser._id,
      { $pull: { friends: { friendId: fromUser._id } } },
      { new: true }
    );

    return res.status(200).json(userUpdated)
  } catch (error) {
    return res.status(500).json(error);
  }

}

module.exports = {
  verificationUpdate,
  findUser,
  getUsers,
  find,
  sendRequestAddFriend,
  refuseRequest,
  acceptRequest,
  unFriend
};
