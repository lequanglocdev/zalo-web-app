import React, { useContext, useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import FilterSharpIcon from "@mui/icons-material/FilterSharp";
import AttachFileSharpIcon from "@mui/icons-material/AttachFileSharp";
import TextField from "@mui/material/TextField";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
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
  const chatContainerRef = useRef(null);
  useEffect(() => {
    api({
      method: typeHTTP.GET,
      url: `/message/get-by-room/${data.currentRoom?._id}`,
    }).then((messages) => setMessages(messages));
    // console.log(data.currentRoom?._id);
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
    setMessage("");
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // event.preventDefault(); // Ngăn ngừa việc xuống dòng khi ấn Enter
      handleSendMessage(); // Gửi tin nhắn khi ấn Enter
    }
  };
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <Box
      sx={{
        height: heightBody,
      }}
    >
      <Box
        sx={{
          height: heightChat,
          gap: 1,
          overflow: "hidden",
          overflowY: "auto",
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#b2bec3" },
          "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#bfc2cf" },
        }}
      >
        <Paper
          style={{
            height: heightChat,
            overflowY: "auto",
            backgroundColor: "#bdc3c7",
          }}
          ref={chatContainerRef}
        >
          {messages.map((item, index) => (
            <Stack
              key={index}
              direction="row"
              justifyContent={
                item.user_id === data.user._id ? "flex-end" : "flex-start"
              }
              px="10px"
            >
              <Box
                p={1.5}
                m={1.5}
                sx={{
                  backgroundColor:
                    item.user_id === data.user._id ? "#0984e3" : "#ecf0f1",
                  borderRadius: "16px",
                }}
              >
                <Typography
                  variant="body2"
                  color={item.user_id === data.user._id ? "#ecf0f1" : "#34495e"}
                >
                  {item.information}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Paper>
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
            // multiline // Đánh dấu TextField là nhiều dòng
            // maxRows={5} // Giới hạn số dòng hiển thị (thay đổi giá trị tùy theo nhu cầu)
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onKeyPress={handleKeyPress}
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
                  {/* <Stack>
                    <ChatBubbleOutlineIcon sx={{ cursor: "pointer" }} />
                  </Stack>
                  <InsertEmoticonIcon
                    sx={{ marginLeft: "20px", cursor: "pointer" }}
                  /> */}
                  <Button
                    sx={{ paddingX: "10px" }}
                    variant="contained"
                    onClick={() => handleSendMessage()}
                  >
                    Gửi
                  </Button>
                </Box>
              ),
            }}
            sx={{
              // maxHeight: "80px", // Thay đổi giá trị tùy theo nhu cầu
              // overflowY: "auto", // Thiết lập cuộn dọc khi văn bản vượt quá chiều cao
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BodyChat;
