import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import React, { useContext, useState } from "react";
import { globalContext } from "../context/globalContext";
import { api, typeHTTP } from "../utils/api";

const style = {};
const AddFriend = ({ handleCloseModalAddFriend }) => {
  const [name, setName] = useState("");
  const [results, setResult] = useState([]);
  const { data } = useContext(globalContext);

  // const handleOpenModal = (event) => {
  //   handleCloseModalAddFriend(event);
  // };
  const handleSearch = () => {
    setResult([]);
    api({ url: "/user/find", method: typeHTTP.GET }).then((res) => {
      const arr = [];
      res.forEach((item) => {
        if (item.username.toLowerCase().includes(name.toLowerCase())) {
          arr.push(item);
        }
      });
      setResult(arr);
    });
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
        return <Button variant="contained">Đã gửi lời mời kết bạn</Button>;
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

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "#fff",
        border: "1px solid #333",
        borderRadius: "6px",
        padding: "10px",

        display: "flex",
        flexDirection: "column",
        height: "500px",
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
        <Typography>Thêm bạn</Typography>
        <CloseIcon sx={{ cursor: "pointer" }} />
      </Box>
      <Box
        sx={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "10%",
        }}
      >
        <Typography>Nhập tên</Typography>
        <TextField
          variant="filled"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Box>
      <Box
        sx={{ height: "70%", backgroundColor: "#dfe6e9", marginTop: "20px" }}
      >
        <Typography sx={{ color: "#0984e3" }}>Danh sách tìm bạn bè</Typography>
        {results.map((results, index) => {
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
        })}
      </Box>
      <Box
        sx={{
          height: "10%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <Button variant="text" sx={{ marginRight: "20px" }}>
          Hủy
        </Button>
        <Button variant="contained" onClick={() => handleSearch()}>
          Tìm bạn
        </Button>
      </Box>
    </Box>
  );
};

export default AddFriend;
