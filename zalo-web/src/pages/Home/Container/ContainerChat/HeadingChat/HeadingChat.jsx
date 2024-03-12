import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SearchIcon from "@mui/icons-material/Search";
const HeadingChat = () => {
  return (
    <Box
      sx={{
        padding: "16px",
        border: "1px solid #3333",
        height: (theme) => theme.zalo.heightSearch,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
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
              src="https://avatars.githubusercontent.com/u/107296302?v=4"
            ></Avatar>
          </IconButton>
        </Tooltip>
        <Box>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>An</div>
          <div style={{ fontSize: "14px", color: "#7589A3" }}>
            Truy cập cách đây 20 phút trước{" "}
          </div>
        </Box>
      </Box>
      <Box>
        <PersonAddAltIcon sx={{ marginRight: "16px", cursor: "pointer" }} />
        <SearchIcon sx={{ marginRight: "16px", cursor: "pointer" }} />
      </Box>
    </Box>
  );
};

export default HeadingChat;
