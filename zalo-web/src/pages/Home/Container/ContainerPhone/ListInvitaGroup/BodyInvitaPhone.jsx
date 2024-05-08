import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";

import { globalContext } from "../../../../../context/globalContext";
import { api, typeHTTP } from "../../../../../utils/api";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";

const BodyInvitaPhone = () => {
  const { data } = useContext(globalContext);
  const [results, setResult] = useState([]);

  const handleRefuse = (toUser) => {
    const body = {
      fromUser: data.user,
      toUser,
    };
    api({
      body: body,
      url: "/user/refuse-request",
      method: typeHTTP.POST,
    }).then((res) => {
      console.log(res);
    });
  };

  const handleAccept = (toUser) => {
    const body = {
      fromUser: data.user,
      toUser,
    };
    api({
      body: body,
      url: "/user/accept-request",
      method: typeHTTP.POST,
    }).then((res) => {
      console.log(res);
    });
  };
  const checkRelationship = (otherUser) => {
    if (
      data.user.friends.map((item) => item.friendId).includes(otherUser._id)
    ) {
      const friend = data.user.friends.filter(
        (item) => item.friendId === otherUser._id
      )[0];
      if (friend.status === "pending") {
        return (
          <>
            <Button variant="contained">Đã gửi lời mời kết bạn</Button>;
          </>
        );
      } else {
        if (friend.status === "request") {
          return (
            <>
              <Button
                variant="contained"
                onClick={() => handleAccept(otherUser)}
              >
                Chap Nhan
              </Button>
              <Button
                variant="contained"
                onClick={() => handleRefuse(otherUser)}
              >
                Tu Choi
              </Button>
            </>
          );
        } else {
          return <Button variant="contained">Ban bè</Button>;
        }
      }
    } else {
      return (
        <Button
          variant="contained"
          onClick={() => handleSendRequestAddFriend(otherUser)}
        >
          Gửi lời mời kết bạn
        </Button>
      );
    }
  };
  const handleSendRequestAddFriend = (toUser) => {
    const body = {
      fromUser: data.user,
      toUser,
    };
    api({
      body: body,
      url: "/user/send-request-add-friend",
      method: typeHTTP.POST,
    }).then((res) => {
      console.log(res);
    });
  };
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
      {checkRelationship(results) ? (
        <Box>
          {results.map((results, index) => (
            <Box key={index}>
              <Typography>{results.username}</Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="https://nghithao.vn/assets/images/no-cart.png"
            style={{ width: "200px" }}
          />
          <Typography sx={{ color: "#b2bec3", margin: "20px" }}>
            Bạn không có lời mời nào
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default BodyInvitaPhone;
