const Room = require("../models/Room");
const User = require("../models/User");
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
