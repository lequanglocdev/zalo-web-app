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
const BodyPhone = () => {
  const [searchValue, setSearchValue] = useState("");
  const [name, setName] = useState("");
  const handleChange = (event) => {
    setName(event.target.value);
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
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        height:(theme) => theme.zalo.heightList,
        gap: 1,
        overflow: "hidden",
        overflowY: "auto",
        "&::-webkit-scrollbar-thumb": { backgroundColor: "#b2bec3" },
        "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#bfc2cf" },
      }}
    >
      <Box sx={{ height: "64px" }}>
        <Typography>Bạn bè </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "64px",
        }}
      >
        <TextField
          id="outlined-search"
          label="Tìm bạn "
          type="text"
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ cursor: "pointer", borderRadius: "10px" }}
              >
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <CloseIcon
                sx={{
                  color: searchValue ? "white" : "transparent",
                  cursor: "pointer",
                }}
                onClick={() => setSearchValue("")}
              />
            ),
          }}
          sx={{
            minWidth: "260px",
          }}
        />
        <FormControl sx={{ m: 1, minWidth: "260px" }} size="small">
          <InputLabel id="demo-select-small-label">Tên (A-Z)</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={name}
            label="Tên (A-Z)"
            onChange={handleChange}
          >
            <MenuItem value={10}>Tên (A-Z)</MenuItem>
            <MenuItem value={20}>Tên (Z-A)</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: "260px" }} size="small">
          <InputLabel id="demo-select-small-label">Tất cả</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={name}
            label="Tất cả"
            onChange={handleChange}
          >
            <MenuItem value={10}>Tất cả</MenuItem>
            <MenuItem value={20}>Phân loại</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box>
        <Typography
          sx={{ height: "32px", display: "flex", alignItems: "center" }}
        >
          A
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: deepOrange[500] }}>A</Avatar>
          <Typography sx={{ paddingX: 2 }}>An</Typography>

          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ position: "relative", right: "0" }}
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
      </Box>
      <Box>
        <Typography
          sx={{ height: "32px", display: "flex", alignItems: "center" }}
        >
          A
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: deepOrange[500] }}>A</Avatar>
          <Typography sx={{ paddingX: 2 }}>An</Typography>

          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ position: "relative", right: "0" }}
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
      </Box>
      <Box>
        <Typography
          sx={{ height: "32px", display: "flex", alignItems: "center" }}
        >
          A
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: deepOrange[500] }}>A</Avatar>
          <Typography sx={{ paddingX: 2 }}>An</Typography>

          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ position: "relative", right: "0" }}
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
      </Box>
      <Box>
        <Typography
          sx={{ height: "32px", display: "flex", alignItems: "center" }}
        >
          A
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: deepOrange[500] }}>A</Avatar>
          <Typography sx={{ paddingX: 2 }}>An</Typography>

          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ position: "relative", right: "0" }}
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
      </Box>
      <Box>
        <Typography
          sx={{ height: "32px", display: "flex", alignItems: "center" }}
        >
          A
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: deepOrange[500] }}>A</Avatar>
          <Typography sx={{ paddingX: 2 }}>An</Typography>

          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ position: "relative", right: "0" }}
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
      </Box>
      <Box>
        <Typography
          sx={{ height: "32px", display: "flex", alignItems: "center" }}
        >
          A
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: deepOrange[500] }}>A</Avatar>
          <Typography sx={{ paddingX: 2 }}>An</Typography>

          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ position: "relative", right: "0" }}
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
      </Box>
      <Box>
        <Typography
          sx={{ height: "32px", display: "flex", alignItems: "center" }}
        >
          A
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: deepOrange[500] }}>A</Avatar>
          <Typography sx={{ paddingX: 2 }}>An</Typography>

          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ position: "relative", right: "0" }}
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
      </Box>
      <Box>
        <Typography
          sx={{ height: "32px", display: "flex", alignItems: "center" }}
        >
          A
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: deepOrange[500] }}>A</Avatar>
          <Typography sx={{ paddingX: 2 }}>An</Typography>

          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ position: "relative", right: "0" }}
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
      </Box>
    </Box>
  );
};

export default BodyPhone;
