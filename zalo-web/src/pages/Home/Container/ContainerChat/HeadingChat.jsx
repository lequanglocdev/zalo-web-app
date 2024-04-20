import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SearchIcon from "@mui/icons-material/Search";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import { getRemainUserForSingleRoom } from "../../../../utils/getRemainUserForSingleRoom";
import { globalContext } from "../../../../context/globalContext";
import Grid from "@mui/material/Grid";
const HeadingChat = () => {
  const { data, handler } = useContext(globalContext);
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        border: "1px solid #3333",
        height: (theme) => theme.zalo.heightSearch,
      }}
    >
      {/* Left Section */}
      <Grid item xs={8} sm={4}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip>
            <IconButton
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                sx={{ width: 40, height: 40 }}
                alt="Cindy Baker"
                src="/static/images/avatar/3.jpg"
              ></Avatar>
            </IconButton>
          </Tooltip>
          <Box>
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>
              {data.currentRoom?.type === "single"
                ? getRemainUserForSingleRoom(data.currentRoom, data.user?._id)
                    ?.username
                : data.currentRoom.name}
            </div>
            <div style={{ fontSize: "14px", color: "#7589A3" }}>
              {data.currentRoom?.type === "group"
                ? `${data.currentRoom?.users.length} thanh vien`
                : "Truy cập cách đây 20 phút trước"}
            </div>
          </Box>
        </Box>
      </Grid>

      {/* Right Section */}
      <Grid item sm={2} >
        <Box sx={{ textAlign: "right" }}>
          <SearchIcon sx={{ marginRight: "16px", cursor: "pointer" }} />
          <PhoneIcon sx={{ marginRight: "16px", cursor: "pointer" }} />
          <VideocamIcon sx={{ marginRight: "16px", cursor: "pointer" }} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default HeadingChat;
