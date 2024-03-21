import { Box, Stack } from "@mui/material";
import React from "react";

const Conversation = () => {
  return (
    <Stack height={"100%"} maxHeight={"100vh"}>
      {/* chat header */}
      <Box sx={{ height: 100, width: "100%", backgroundColor: "#000" }}></Box>

      {/* Message */}
      <Box width={"100%"} sx={{ flexGrow: 1 }}></Box>

      {/* chat footer */}
      <Box sx={{ height: 100, width: "100%", backgroundColor:"red" }}></Box>
    </Stack>
  );
};

export default Conversation;
