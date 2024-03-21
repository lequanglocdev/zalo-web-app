import React from "react";
import Box from "@mui/material/Box";
import HeadingChat from "./HeadingChat";
import BodyChat from "./BodyChat";
import Conversation from "./Conversation";
const ContainerChat = () => {
  return (
    <Box>
      <HeadingChat />
      <BodyChat />
      {/* <Conversation/> */}
    </Box>
  );
};

export default ContainerChat;