import Box from "@mui/material/Box";

import Search from "~/components/Search/Search";
import ListUser from "./ListUser/ListUser";

const ChatHome = ({ chat }) => {
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
      <ListUser users={chat?.[0]?.users} />
    </Box>
  );
};

export default ChatHome;
