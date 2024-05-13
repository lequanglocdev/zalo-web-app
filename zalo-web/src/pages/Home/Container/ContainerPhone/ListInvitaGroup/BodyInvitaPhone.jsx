import React, { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { globalContext } from "../../../../../context/globalContext";
import { api, typeHTTP } from "../../../../../utils/api";
import { da } from "@faker-js/faker";

const BodyInvitaPhone = () => {
  const { data, handler } = useContext(globalContext);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    api({
      url: `/user/friend-requests/${data.user?._id}`,
      method: typeHTTP.GET,
    }).then((res) => {
      console.log(res)
     setFriendRequests(res)
    });
  }, [data.user]);

  const handleAccept = async (friendRequest) => {
    try {
      // Gửi yêu cầu chấp nhận lời mời kết bạn đến backend
      await api({
        url: "/user/accept-request",
        method: typeHTTP.POST,
        body: { fromUser: friendRequest.fromUser, toUser: data.user },
      });
      // Cập nhật danh sách lời mời kết bạn sau khi chấp nhận
      setFriendRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== friendRequest._id)
      );
    } catch (error) {
      console.error("Lỗi khi chấp nhận lời mời kết bạn:", error);
    }
  };

  const handleRefuse = async (friendRequest) => {
    try {
      // Gửi yêu cầu từ chối lời mời kết bạn đến backend
      await api({
        url: "/user/refuse-request",
        method: typeHTTP.POST,
        body: { fromUser: friendRequest.fromUser, toUser: data.user },
      });
      // Cập nhật danh sách lời mời kết bạn sau khi từ chối
      setFriendRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== friendRequest._id)
      );
    } catch (error) {
      console.error("Lỗi khi từ chối lời mời kết bạn:", error);
    }
  };

  return (
    <Box
      sx={{
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        overflowY: "auto",
        height: "calc(100vh - 64px)",
      }}
    >
      {friendRequests && friendRequests.length > 0 ? (
        friendRequests.map((request,index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ccc",
              padding: "8px 0",
            }}
          >
            <Typography>{request?.username}</Typography>
            <Typography>{request?.length}</Typography>
            <Box>
              <Button
                variant="contained"
                onClick={() => handleAccept(request)}
              >
                Chấp nhận
              </Button>
              <Button
                variant="contained"
                onClick={() => handleRefuse(request)}
              >
                Từ chối
              </Button>
            </Box>
          </Box>
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography sx={{ color: "#b2bec3", margin: "20px" }}>
            Bạn không có lời mời kết bạn nào.
          </Typography>
        </Box>
      )}
      
    </Box>
  );
};

export default BodyInvitaPhone;
