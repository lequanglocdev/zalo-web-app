import Box from "@mui/material/Box";
import React, { useContext, useEffect } from "react";

import Search from "../../../components/Search";
import Divider from "@mui/material/Divider";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Chat from "../../../components/Chat";
import BodyChat from "../Container/ContainerChat/BodyChat";
import ContainerChat from "../Container/ContainerChat/ContainerChat";
import { globalContext } from "../../../context/globalContext";

import WellCome from "../../../components/WellCome";
const ChatHome = () => {
  const { data, handler } = useContext(globalContext);
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",

        borderRight: "1px solid #dfe6e9",
        borderRadius: "4px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "30%",

          flexDirection: "column",
        }}
      >
        <Search />
        <Divider />
        <Box>
          <Chat />
        </Box>
      </Box>
      <Box sx={{ width: "70%", height: "100vh" }}>
        <Box style={{ width: "100%" }}>
          {data.currentRoom ? (
            <Box style={{ width: "100%", height: "100%" }}>
              <Box className="header" style={{ width: "100%", height: "10%" }}>
                {/* {`Tro chuyen voi ${
                  getRemainUserForSingleRoom(data.currentRoom, data.user?._id)
                    .username
                }`} */}
                <ContainerChat />
              </Box>
            </Box>
          ) : (
            <Box sx={{ width: "100%", height: "100vh" }}>
              <WellCome />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatHome;
