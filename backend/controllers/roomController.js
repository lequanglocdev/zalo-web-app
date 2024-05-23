const Room = require("../models/Room");
const User = require("../models/User");
const uploadToS3 = require("../upload/s3");
const { formatBase64ToBuffer } = require("../utils/buffer");
class RoomController {
  createRoom = async (req, res) => {
    try {
      const { room } = req.body;
      const newRoom = await Room.create(room);
      return res.status(201).json(newRoom);
    } catch (error) {
      return res.status(500).json(error.Message);
    }
  };

  createGroup = async (req, res) => {
    try {
      const { name, type, users, creator } = req.body;
      const image = req.file;
      const result = await uploadToS3(
        `${
          image.mimetype.split("/")[0] !== "application"
            ? image.mimetype.split("/")[0]
            : image.originalname.split(".")[
                image.originalname.split(".").length - 1
              ]
        }___${Date.now().toString()}_${image.originalname.split(".")[0]}`,
        image.buffer,
        image.mimetype,
        image.fieldname,
        image.size / 1024
      );
      const url = result.url;
      const room = {
        name,
        type,
        users,
        image: url,
      };
      const newRoom = await Room.create(room);
      return res.status(201).json(newRoom);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.Message);
    }
  };

  createGroupMobile = async (req, res) => {
    try {
      const { name, type, users, image, creator } = req.body;
      image.buffer = await formatBase64ToBuffer(image.base64);
      image.base64 = "";
      const result = await uploadToS3(
        `${
          image.mimetype.split("/")[0] !== "application"
            ? image.mimetype.split("/")[0]
            : image.originalname.split(".")[
                image.originalname.split(".").length - 1
              ]
        }___${Date.now().toString()}_${image.originalname.split(".")[0]}`,
        image.buffer,
        image.mimetype,
        image.fieldname,
        image.size / 1024
      );
      const url = result.url;
      const room = {
        name,
        type,
        users,
        image: url,
        creator,
      };
      const newRoom = await Room.create(room);
      return res.status(201).json(newRoom);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.Message);
    }
  };

  deleteRoom = async (req, res) => {
    const { id } = req.params;
    try {
      await Room.findByIdAndDelete(id);
      return res.status(200).json("Delete Succesfully");
    } catch (error) {
      return res.status(500).json(error.Message);
    }
  };

  getRoomByUser = async (req, res) => {
    try {
      const { id } = req.params;
      const rooms = await Room.find().lean();
      const users = await User.find().lean();
      let roomByUser = rooms.filter((room) => {
        if (room.users.map((item) => item.toString()).includes(id)) {
          return room;
        }
      });
      roomByUser.forEach((room) => {
        room.users = room.users.map((id) => {
          const user = users.filter((item) => {
            return item._id.toString() === id.toString();
          })[0];
          return user;
        });
      });
      return res.status(200).json(roomByUser);
    } catch (error) {
      return res.status(500).json(error.Message);
    }
  };

  addDepute = async (req, res) => {
    try {
      const { room_id, user_id } = req.body;
      const roomUpdated = await Room.findOneAndUpdate(
        { _id: room_id },
        { $push: { depute: user_id } },
        { new: true }
      );
      return res.status(200).json(roomUpdated);
    } catch (error) {
      return res.status(500).json(error.Message);
    }
  };

  removeDepute = async (req, res) => {
    try {
      const { room_id, user_id } = req.body;
      const roomUpdated = await Room.findOneAndUpdate(
        { _id: room_id },
        { $pull: { depute: user_id } },
        { new: true }
      );
      return res.status(200).json(roomUpdated);
    } catch (error) {
      return res.status(500).json(error.Message);
    }
  };

  kick = async (req, res) => {
    try {
      const { room_id, user_id } = req.body;
      const roomUpdated = await Room.findOneAndUpdate(
        { _id: room_id },
        { $pull: { users: user_id } },
        { new: true }
      );
      if (roomUpdated.users.length === 1) {
        const roomDelete = await Room.findByIdAndDelete(room_id);
      }
      return res.status(200).json(roomUpdated);
    } catch (error) {
      return res.status(500).json(error.Message);
    }
  };

  leave = async (req, res) => {
    try {
      const { room_id, user_id } = req.body;
      let roomUpdated = await Room.findOneAndUpdate(
        { _id: room_id },
        { $pull: { users: user_id } },
        { new: true }
      );
      if (roomUpdated.depute.length > 0) {
        roomUpdated.creator = roomUpdated.depute[0];
        roomUpdated.depute = roomUpdated.depute.filter(
          (item, index) => index !== 0
        );
      } else {
        roomUpdated.creator = roomUpdated.users[0];
      }
      let roomUpdated1 = await Room.findByIdAndUpdate(
        roomUpdated._id,
        roomUpdated
      );
      if (roomUpdated1.users.length === 1) {
        await Room.findByIdAndDelete(room_id);
      }
      return res.status(200).json(roomUpdated1);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.Message);
    }
  };
}

module.exports = new RoomController();
