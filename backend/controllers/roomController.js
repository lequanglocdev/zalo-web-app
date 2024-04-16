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
      const { name, type, users } = req.body;
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
      const { name, type, users, image } = req.body;
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
}

module.exports = new RoomController();
