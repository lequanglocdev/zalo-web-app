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
    console.log(`Client connected: ${socket.id}`);
    socket.on("send_message", async (body) => {
      await Message.create(body);
      // console.log("Message saved to the database:", body);
      const messages = await Message.find({ room_id: body.room_id }).lean();
      // console.log("Sending messages to clients:", messages);
      socket.emit(body.room_id, messages);
    });
  });
};

module.exports = socket;
