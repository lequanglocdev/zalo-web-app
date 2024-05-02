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
              <img
                alt="Cindy Baker"
                src={
                  data.currentRoom.image
                    ? data.currentRoom.image
                    : "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                }
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </IconButton>
          </Tooltip>
          <Box sx={{ width: "100%" }}>
            <Box
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data.currentRoom?.type === "single"
                ? getRemainUserForSingleRoom(data.currentRoom, data.user?._id)
                    ?.username
                : data.currentRoom.name.length > 30
                ? `${data.currentRoom.name.substring(0, 30)}...`
                : data.currentRoom.name}
            </Box>
            <Box style={{ fontSize: "14px", color: "#7589A3" }}>
              {data.currentRoom?.type === "group"
                ? `${data.currentRoom?.users.length} thanh vien`
                : "Truy cập cách đây 20 phút trước"}
            </Box>
          </Box>
        </Box>
      </Grid>

      {/* Right Section */}
      <Grid item sm={2}>
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
