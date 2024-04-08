const messageModel = require("../models/Message");

class MessageController {
  getByRoom = async (req, res) => {
    try {
      const { id } = req.params;
      const messages = await messageModel.find({ room_id: id }).lean();
      return res.status(200).json(messages);
    } catch (error) {
      return res.status(500).json(error.Message);
    }
  };
}

module.exports = new MessageController();
