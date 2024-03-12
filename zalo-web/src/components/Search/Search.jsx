import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";

import AddFriend from "../Modal/AddFriend";

const SearchStyle = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: "#dfe6e9",

  "&:hover": {
    backgroundColor: "#dfe6e9",
    borderRadius: 20,
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#636e72",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),

    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        border: "1px solid #74b9ff",
        borderRadius: 20,
      },
    },
  },
}));

const Search = () => {
  const [openModalAddFriend, setOpenModalAddFriend] = React.useState(false);
  const handleOpenModalAddFriend = () => setOpenModalAddFriend(true);
  const handleCloseModalAddFriend = (event) => {
    event.stopPropagation();
    setOpenModalAddFriend(false);
  };
  return (
    <Box>
      <Toolbar>
        <SearchStyle>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Tìm kiếm"
            inputProps={{ "aria-label": "search" }}
          />
        </SearchStyle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tooltip title="Thêm bạn">
            <IconButton>
              <PersonAddAltIcon onClick={handleOpenModalAddFriend} />
            </IconButton>
            <Modal
              open={openModalAddFriend}
              onClose={handleCloseModalAddFriend}
            >
              <AddFriend
                handleCloseModalAddFriend={handleCloseModalAddFriend}
              />
            </Modal>
          </Tooltip>

          <Tooltip title="Tạo nhóm chat">
            <IconButton>
              <GroupAddIcon />
            </IconButton>
            <Modal
              open={openModalAddFriend}
              onClose={handleCloseModalAddFriend}
            >
              <AddFriend
                handleCloseModalAddFriend={handleCloseModalAddFriend}
              />
            </Modal>
          </Tooltip>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default Search;
