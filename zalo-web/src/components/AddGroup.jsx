import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import React, { useContext, useState } from "react";
import { globalContext } from "../context/globalContext";
import { api, typeHTTP } from "../utils/api";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

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
  marginTop: "20px",
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
      width: "100ch",
      "&:focus": {
        border: "1px solid #74b9ff",
        borderRadius: 20,
      },
    },
  },
}));

const AddGroup = ({ handleCloseModalAddGroup }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = (event) => {
    handleCloseModalAddGroup(event);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "490px",
        height: "600px",
        bgcolor: "#fff",
        border: "1px solid #333",
        borderRadius: "6px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "10%",
        }}
      >
        <Typography>Tạo nhóm</Typography>
        <Button onClick={handleOpenModal}>
          <CloseIcon sx={{ color: "#333" }} />
        </Button>
      </Box>
      <Box
        sx={{
          marginTop: "10px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          height: "10%",
        }}
      >
        <PhotoCameraBackIcon sx={{ flex: 1 }} />

        <Box sx={{ flex: 2 }}>
          <TextField
            variant="filled"
            sx={{ width: "400px" }}
            placeholder="nhập tên nhóm"
          />
        </Box>
      </Box>
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
        sx={{ height: "70%", backgroundColor: "#dfe6e9", marginTop: "20px" }}
      >
        <Typography sx={{ color: "#0984e3" }}>Danh sách tìm bạn bè</Typography>
        {/* {results.map((results, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                <Typography>{results.username}</Typography>
              </Box>
              {checkRelationship(results)}
            </Box>
          );
        })} */}
      </Box>
      <Box
        sx={{
          height: "10%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <Button
          variant="text"
          sx={{ marginRight: "20px" }}
          onClick={handleOpenModal}
        >
          Hủy
        </Button>
        <Button variant="contained">Tạo nhóm</Button>
      </Box>
    </Box>
  );
};

export default AddGroup;
