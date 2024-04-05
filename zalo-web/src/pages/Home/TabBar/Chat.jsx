import Box from "@mui/material/Box";

import Search from "../../../components/Search";
import ListUser from "~/components/ListUser";
import Divider from "@mui/material/Divider";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Chat from "../../../components/Chat";

const ChatHome = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: (theme) => theme.zalo.asideChatWidth,
        borderRight: "1px solid #dfe6e9",
        borderRadius: "4px",
      }}
    >
      <Search sx={{ height: (theme) => theme.zalo.heightSearch }} />
      <Divider />
      <Chat />
    </Box>
  );
};

export default ChatHome;
