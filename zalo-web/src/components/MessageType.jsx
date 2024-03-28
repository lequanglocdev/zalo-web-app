import { Divider, Stack, Typography, Box, IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DotsThreeVertical, DownloadSimple, Image } from "phosphor-react";
import React from "react";
import { messageOption } from "../apis/mock-data";

const DocMessage = ({ el }) => {
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming ? "#ecf0f1" : "#0984e3",
          borderRadius: 6,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack p={2} direction="row" spacing={3} alignItems="center">
            <Image size={48} />
            <Typography variant="caption">Download file.png</Typography>
            <IconButton>
              <DownloadSimple />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
      <MessageOption />
    </Stack>
  );
};

const LinkMsg = ({ el }) => {
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming ? "#ecf0f1" : "#0984e3",
          borderRadius: 6,
          width: "max-content",
        }}
      ></Box>
    </Stack>
  );
};

const ReplyMessage = ({ el }) => {
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming ? "#ecf0f1" : "#0984e3",
          borderRadius: 6,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction="column"
            spacing={3}
            alignItems="center"
            sx={{
              backgroundColor: "#fff",
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" backgroundColor="#fff">
              {el.message}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            color={el.incoming ? "#34495e" : "#ecf0f1"}
          >
            {el.reply}
          </Typography>
        </Stack>
      </Box>
      <MessageOption />
    </Stack>
  );
};

const MediaMessage = ({ el }) => {
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        sx={{
          backgroundColor: el.incoming ? "#ecf0f1" : "#0984e3",
          borderRadius: 10,
          width: "max-content",
        }}
      >
        <Stack>
          <img
            src={el.img}
            alt={el.message}
            style={{ maxHeight: 210, borderRadius: "10px" }}
          />
          <Typography
            variant="body2"
            color={el.incoming ? "#34495e" : "#ecf0f1"}
          >
            {el.message}
          </Typography>
        </Stack>
      </Box>
      <MessageOption />
    </Stack>
  );
};

const TextMessage = ({ el }) => {
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming ? "#ecf0f1" : "#0984e3",
          borderRadius: 10,
          width: "max-content",
        }}
      >
        <Typography variant="body2" color={el.incoming ? "#34495e" : "#ecf0f1"}>
          {el.message}
        </Typography>
      </Box>
      <MessageOption />
    </Stack>
  );
};

const Timeline = ({ el }) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Divider width="46%" />
      <Typography variant="caption" sx={{ color: "#000" }}>
        {el.text}
      </Typography>
      <Divider width="46%" />
    </Stack>
  );
};

const MessageOption = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <DotsThreeVertical
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size={20}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack spacing={1} px={1}>
          {messageOption.map((el) => (
            <MenuItem onClick={handleClick} key={""}>
              {el.title}
            </MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  );
};

export {
  Timeline,
  TextMessage,
  MediaMessage,
  ReplyMessage,
  LinkMsg,
  DocMessage,
  MessageOption,
};
