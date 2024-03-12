import React from "react";
import Box from "@mui/material/Box";
import FilterSharpIcon from "@mui/icons-material/FilterSharp";
import AttachFileSharpIcon from "@mui/icons-material/AttachFileSharp";
import TextField from "@mui/material/TextField";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Typography from "@mui/material/Typography";
const heightBody = "592px";
const heightChat = "486px";
const heightText = `calc(${heightBody} - ${heightChat})`;
const BodyChat = () => {
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
        Chat
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
                  <ChatBubbleOutlineIcon sx={{ cursor: "pointer" }} />
                  <InsertEmoticonIcon
                    sx={{ marginLeft: "20px", cursor: "pointer" }}
                  />
                  <Typography
                    sx={{ fontSize: "20px", marginLeft: "20px", padding: 2 }}
                  >
                    Gửi
                  </Typography>
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
