import React from "react";
import Box from "@mui/material/Box";
import HeadingChat from "./HeadingChat/HeadingChat";
import BodyChat from "./BodyChat/BodyChat";

const ContainerChat = () => {
  return (
    <Box>
      <HeadingChat />
      <BodyChat />
    </Box>
  );
};

export default ContainerChat;