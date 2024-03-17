import Box from "@mui/material/Box";

import Search from "../../../components/Search";
import ListUser from "~/components/ListUser";

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
      <ListUser />
    </Box>
  );
};

export default ChatHome;
