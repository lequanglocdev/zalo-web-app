import Box from "@mui/material/Box";
import * as React from "react";

import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { faker } from "@faker-js/faker";
import Typography from "@mui/material/Typography";
import { ChatList } from "../apis/mock-data";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const ChatElement = ({ id, name, img, msg, time, unread, online }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "60px",
        borderRadius: 1,
      }}
      p={1}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={2} sx={{ height: "100vh",cursor:"pointer" }}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={img} />
            </StyledBadge>
          ) : (
            <Avatar src={img} />
          )}

          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
            <Typography variant="caption">{msg}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems="center">
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            {time}
          </Typography>
          <Badge color="primary" badgeContent={unread}></Badge>
        </Stack>
      </Stack>
    </Box>
  );
};

const Chat = () => {
  return (
    <Stack direction="column" sx={{flexGrow:1, overflow: "scroll", height: "100%" }}>
      <Stack spacing={1}>
        <Typography
          variant="subtitle2"
          sx={{ color: "#3498db", fontSize: "14px", fontWeight: 600 }}
          p={2}
        >
          Tin chưa đọc
        </Typography>
        {ChatList.filter((el) => el.pinned).map((el) => {
          return <ChatElement key={""} {...el} />;
        })}
      </Stack>
      <Stack spacing={1}>
        <Typography
          variant="subtitle2"
          sx={{ color: "#3498db", fontSize: "14px", fontWeight: 600 }}
          p={2}
        >
          Tất cả tin nhắn
        </Typography>
        {ChatList.filter((el) => !el.pinned).map((el) => {
          return <ChatElement key={""} {...el} />;
        })}
      </Stack>
    </Stack>
  );
};

export default Chat;
