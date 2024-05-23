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
    console.log(error);
    return res.status(500).json(error.Message);
  }
};

const unFriend = async (req, res) => {
  try {
    const { fromUser, toUser, room_id } = req.body;

    const query1 = {
      friendId: fromUser._id,
      status: "accepted",
    };

    const query2 = {
      friendId: toUser._id,
      status: "accepted",
    };

    await User.findByIdAndUpdate(
      { _id: toUser._id },
      { $pull: { friends: query1 } },
      { new: true }
    );

    const fromUserUpdated = await User.findByIdAndUpdate(
      { _id: fromUser._id },
      { $pull: { friends: query2 } },
      { new: true }
    );

    await Room.findByIdAndDelete(room_id);

    return res.status(200).json(fromUserUpdated);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const getFriendRequests = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("friends.friendId");

    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại" });
    }

    const friendRequests = user.friends
      .filter((friend) => friend.status === "request")
      .map((friend) => {
        return {
          friendId: friend.friendId._id,
          username: friend.friendId.username,
          status: friend.status,
          image: friend.friendId.image,
        };
      });

    res.status(200).json(friendRequests);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getFullInformationUsers = async (req, res) => {
  const { user_ids } = req.body;
  const users = await User.find();
  user_ids = user_ids.map((item) => {
    return users.filter((item1) => item1._id === item._id)[0];
  });
  return res.status(200).json(user_ids);
};

module.exports = {
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
};
