const messageModel = require("../models/Message");
const uploadToS3 = require("../upload/s3");
const { formatBase64ToBuffer } = require("../utils/buffer");

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
  sendMessage = async (req, res) => {
    try {
      const { room_id, typeMessage, user_id, disabled } = req.body;
      const information = req.files[0];
      const message = {
        room_id,
        typeMessage,
        user_id,
        disabled,
      };
      if (typeMessage !== "text" && typeMessage !== "notify") {
        const result = await uploadToS3(
          `${
            information.mimetype.split("/")[0] !== "application"
              ? information.mimetype.split("/")[0]
              : information.originalname.split(".")[
                  information.originalname.split(".").length - 1
                ]
          }___${Date.now().toString()}_${
            information.originalname.split(".")[0]
          }`,
          information.buffer,
          information.mimetype,
          information.originalname.split(".")[0],
          information.size / 1024
        );

        message.information = result;
      }
      return res.status(201).json(await messageModel.create(message));
    } catch (error) {
      return res.status(500).json(error.Message);
    }
  };

  sendFileMessageMobile = async (req, res) => {
    try {
      const { room_id, typeMessage, user_id, disabled, information } = req.body;

      information.buffer = await formatBase64ToBuffer(information.base64);
      const message = {
        room_id,
        typeMessage,
        user_id,
        disabled,
      };
      if (typeMessage !== "text" && typeMessage !== "notify") {
        const result = await uploadToS3(
          `${
            information.mimetype.split("/")[0] !== "application"
              ? information.mimetype.split("/")[0]
              : information.originalname.split(".")[
                  information.originalname.split(".").length - 1
                ]
          }___${Date.now().toString()}_${
            information.originalname.split(".")[0]
          }`,
          information.buffer,
          information.mimetype,
          information.originalname.split(".")[0],
          information.size / 1024
        );

        message.information = result;
      }
      return res.status(201).json(await messageModel.create(message));
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.Message);
    }
  };

  disableMessage = async (req, res) => {
    try {
      const { message_id } = req.body;

      const messageUpdate = await messageModel.findByIdAndUpdate(
        { _id: message_id },
        { disabled: true },
        { new: true }
      );
      console.log(messageUpdate);
      return res.status(400).json("Xóa tin nhắn không thành công")
    } catch (error) {
      return res.status(500).json(error.Message);
    }
  };
}

module.exports = new MessageController();
