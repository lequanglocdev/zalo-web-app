require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dbConnect = require("./config/dbConnect");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");
const roomRoute = require("./routes/roomRoute");
const messageRoute = require("./routes/messageRoute");
const http = require("http");
const User = require("./models/User");
const socket = require("./socket");
const port = process.env.PORT || 8888;

const app = express();
// const server = http.createServer(app);

// Tăng giới hạn kích thước yêu cầu lên 50MB
app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

dbConnect();
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);
app.use("/v1/chat", chatRoute);
app.use("/v1/room", roomRoute);
app.use("/v1/message", messageRoute);

const server = http.createServer(app);

socket(server, "http://localhost:5173");

server.listen(port, () => {
  console.log("Server is running on port", port);
});
