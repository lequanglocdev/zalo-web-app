import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import CloseIcon from "@mui/icons-material/Close";

import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
const options = [
  "Đánh dấu tin nhắn đã đọc",
  "Gửi tin đồng thời",
  "Trở lại giao diện cơ bản",
];
const ITEM_HEIGHT = 48;
const BodyInvitaPhone = () => {
  return (
    <Box
      sx={{
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        height: (theme) => theme.zalo.heightList,
        gap: 1,
        overflow: "hidden",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ccc",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#ccc",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#ddd",
          borderRadius: "8px",
        },
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection:"column",justifyContent: "center", alignItems: "center" }}
      >
        <img
          src="https://nghithao.vn/assets/images/no-cart.png"
          style={{ width: "200px" }}
        />
        <Typography sx={{color:"#b2bec3",margin:"20px"}}>Bạn không có lời mời nào</Typography>
      </Box>
    </Box>
  );
};

export default BodyInvitaPhone;
