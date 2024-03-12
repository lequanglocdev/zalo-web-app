import * as React from "react";
import Box from "@mui/material/Box";

// Tab
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import User from "./User/User";

const options = [
  "Đánh dấu tin nhắn đã đọc",
  "Gửi tin đồng thời",
  "Trở lại giao diện cơ bản",
];
const ITEM_HEIGHT = 48;

const ListUser = ({ users }) => {
  // console.log("User",users)
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.zalo.heightList,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #ccc",
        }}
      >
        <Tabs value={value} onChange={handleChange}>
          <Tab
            label="Tất cả "
            sx={{ fontSize: "14px", textTransform: "none" }}
          />
          <Tab
            label="Chưa đọc"
            sx={{ fontSize: "14px", textTransform: "none" }}
          />
        </Tabs>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreHorizIcon sx={{ fontSize: "16px" }} />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "26ch",
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              selected={option === "Pyxis"}
              onClick={handleClose}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Box
        sx={{
          p: "0 2px ",
          m: "0 2px",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          overflow: "hidden",
          overflowY: "auto",
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#b2bec3" },
          "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#bfc2cf" },
        }}
      >
        {users?.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </Box>
    </Box>
  );
};

export default ListUser;
