import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FilterSharpIcon from "@mui/icons-material/FilterSharp";
import AttachFileSharpIcon from "@mui/icons-material/AttachFileSharp";
import TextField from "@mui/material/TextField";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Typography from "@mui/material/Typography";
// import Message from "~/components/Message";
import { Stack } from "@mui/material";
import { globalContext } from "../../../../context/globalContext";
import { api, baseURLOrigin, typeHTTP } from "../../../../utils/api";
import { io } from "socket.io-client";
const socket = io.connect(baseURLOrigin);

const heightBody = "592px";
const heightChat = "486px";
const heightText = `calc(${heightBody} - ${heightChat})`;

const BodyChat = () => {
  const [message, setMessage] = useState("");
  const { data } = useContext(globalContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    api({
      method: typeHTTP.GET,
      url: `/message/get-by-room/${data.currentRoom?._id}`,
    }).then((messages) => setMessages(messages));
    console.log(data.currentRoom?._id);
    socket.on(data.currentRoom?._id, (messages) => {
      setMessages(messages);
    });
    return () => {
      socket.off(data.currentRoom?._id);
    };
  }, [data.currentRoom, socket]);

  const handleSendMessage = () => {
    const body = {
      room_id: data.currentRoom?._id,
      information: message,
      typeMessage: "text",
      user_id: data.user?._id,
      disabled: false,
    };

    socket.emit("send_message", body);
    setMessage("")
  };

  return (
    <Box
      sx={{
        height: heightBody,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#e3e5eb",
          height: heightChat,
          gap: 1,
          overflow: "hidden",
          overflowY: "auto",
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#b2bec3" },
          "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#bfc2cf" },
        }}
      >
        {messages.map((message, index) => (
          <div key={index}>{message.information + ""}</div>
        ))}
      </Box>
      <Box
        sx={{
          height: heightText,
        }}
      >
        <Box
          sx={{
            height: "40px",
            display: "flex",
            alignItems: "center",
            padding: "0 18px",
          }}
        >
          <FilterSharpIcon sx={{ margin: "20px" }} />
          <AttachFileSharpIcon />
        </Box>
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            border: "none",
            outline: "none",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TextField
            fullWidth
            placeholder="nhập tin nhắn"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            InputProps={{
              startAdornment: (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    position: "absolute",
                    right: 0,
                  }}
                >
                  <Stack>
                    <ChatBubbleOutlineIcon sx={{ cursor: "pointer" }} />
                  </Stack>
                  <InsertEmoticonIcon
                    sx={{ marginLeft: "20px", cursor: "pointer" }}
                  />
                  <button onClick={() => handleSendMessage()}>Gửi</button>
                </Box>
              ),
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BodyChat;
