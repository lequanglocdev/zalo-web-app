import React, { useContext, useEffect } from "react";
import { api, typeHTTP } from "../utils/api";
import { globalContext } from "../context/globalContext";
import { getRemainUserForSingleRoom } from "../utils/getRemainUserForSingleRoom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { faker } from "@faker-js/faker";
const Chat = () => {
  const { data, handler } = useContext(globalContext);

  useEffect(() => {
    api({
      url: `/room/get-by-user/${data.user?._id}`,
      method: typeHTTP.GET,
    }).then((res) => {
      handler.setRooms(res);
    });
  }, [data.user]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "60px",
        borderRadius: 1,
        borderRight: "1px so",
      }}
    >
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ color: "#3498db", fontSize: "14px", fontWeight: 600 }}
          p={2}
        >
          Tin nhắn của {data.user?.username}
        </Typography>
      </Box>
      <Box>
        {data.rooms.map((room, index) => (
          <Box
            onClick={() => handler.setCurrentRoom(room)}
            key={index}
            style={{
              display: "flex",

              alignItems: "center",
              padding: "6px",
              gap: 5,
              cursor: "pointer",
            }}
          >
            <img
              alt="Cindy Baker"
              src={
                room.image
                  ? room.image
                  : "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
              }
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="span" sx={{fontSize:"14px",fontWeight:"bold"}}>
                {room.type === "single"
                  ? getRemainUserForSingleRoom(room, data.user?._id)?.username
                  : room.name.length > 30
                  ? `${room.name.substring(0, 30)}...`
                  : room.name}
              </Typography>
              <Typography sx={{fontSize:"12px"}}>tin nhắn cuối cùng</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Chat;
