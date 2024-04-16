const { Server } = require("socket.io");
const Message = require("./models/Message");

const socket = (server, baseURL) => {
  const io = new Server(server, {
    cors: {
      cors: {
        origin: baseURL,
        methods: ["GET", "POST", "PUT", "DELETE"],
      },
    },
  });

  io.on("connection", (socket) => {
    // socket.on("update_seen", async (data) => {
    //   const { user_id, seen, room_id, users } = data;
    //   const room = await roomService.updateSeen(room_id, user_id, seen);
    //   const rooms = await roomService.getRoomsByUser(user_id);
    //   io.emit(`update_seen_${room_id}`, room);
    //   io.emit(`${user_id}`, rooms);
    // });

    socket.on("send_message_with_file", async (body) => {
      const messages = await Message.find({ room_id: body.room_id }).lean();
      io.emit(body.room_id, messages);
    });

    socket.on("send_message", async (body) => {
      await Message.create(body);
      const messages = await Message.find({ room_id: body.room_id }).lean();
      io.emit(body.room_id, messages);
    });
  });
};

module.exports = socket;
