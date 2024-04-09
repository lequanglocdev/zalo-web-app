import React, { useContext, useEffect } from "react";
import { api, typeHTTP } from "../utils/api";
import { globalContext } from "../context/globalContext";
import { getRemainUserForSingleRoom } from "../utils/getRemainUserForSingleRoom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

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
        borderRight:"1px so"
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
              paddingLeft: "10px",
              gap: "10px",
              cursor: "pointer",
            }}
          >
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            <Typography variant="span">
              {getRemainUserForSingleRoom(room, data.user?._id).username}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Chat;
