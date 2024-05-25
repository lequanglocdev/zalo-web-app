import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import { getRemainUserForSingleRoom } from "../../../../utils/getRemainUserForSingleRoom";

import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { globalContext } from "../../../../context/globalContext";
import { api, typeHTTP } from "../../../../utils/api";
import Button from "@mui/material/Button";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import OutputIcon from "@mui/icons-material/Output";
import { Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",

  borderRadius: "10px",
};
const HeadingChat = () => {
  const { data, handler } = useContext(globalContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = () => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const [friendshipStatus, setFriendshipStatus] = useState(
    data.users?.friends?.status === "accepted" ? "Người lạ" : "Bạn bè"
  );
  const otherUser = getRemainUserForSingleRoom(
    data.currentRoom,
    data.user?._id
  );
  const handleUnFriend = (toUser) => {
    const body = {
      fromUser: data.user,
      toUser,
      room_id: data.currentRoom._id,
    };

    api({
      body: body,
      url: "/user/unfriend",
      method: typeHTTP.POST,
    })
      .then((res) => {
        handler.setUser(res);
        setFriendshipStatus("Người lạ");
      })
      .catch((error) => {
        console.error("Lỗi khi xóa kết bạn:", error);
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

  const handleLeaveGroup = () => {
    const body = {
      room_id: data.currentRoom._id,
      user_id: data.user._id,
    };
    api({ body, method: typeHTTP.POST, url: "/room/leave" }).then((res) => {
      handler.setRooms(data.rooms.filter((item) => item._id !== res._id));
    });
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        border: "1px solid #3333",
        height: (theme) => theme.zalo.heightSearch,
      }}
    >
      {/* Left Section */}
      <Grid item xs={8} sm={4}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip>
            <IconButton
              onClick={handleOpen}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <img
                alt={
                  data.currentRoom?.type === "single"
                    ? getRemainUserForSingleRoom(
                        data.currentRoom,
                        data.user?._id
                      )?.username
                    : "User Avatar"
                }
                src={
                  data.currentRoom?.type === "single"
                    ? getRemainUserForSingleRoom(
                        data.currentRoom,
                        data.user?._id
                      )?.image ||
                      "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                    : data.currentRoom?.image ||
                      "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                }
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </IconButton>
          </Tooltip>
          <Box sx={{ width: "100%" }}>
            <Box
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <Box sx={{ display: "flex", gap: 6 }}>
                <Typography>
                  {data.currentRoom?.type === "single"
                    ? getRemainUserForSingleRoom(
                        data.currentRoom,
                        data.user?._id
                      )?.username
                    : data.currentRoom.name.length > 30
                    ? `${data.currentRoom.name.substring(0, 30)}...`
                    : data.currentRoom.name}
                </Typography>

                {data.currentRoom?.type === "group" ? (
                  <Typography></Typography>
                ) : (
                  <Typography
                    sx={{
                      color: "#fff",
                      backgroundColor: "#74b9ff",
                      padding: "2px 20px",
                      borderRadius: "6px",
                    }}
                  >
                    {data.currentRoom?.type === "group" ? "" : friendshipStatus}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box style={{ fontSize: "14px", color: "#7589A3" }}>
              {data.currentRoom?.type === "group"
                ? `${data.currentRoom?.users.length} thành viên`
                : "Truy cập cách đây 20 phút trước"}
            </Box>
          </Box>
        </Box>
      </Grid>

      {/* Right Section */}
      <Grid item sm={2}>
        <Box sx={{ textAlign: "right" }}>
          <SearchIcon sx={{ marginRight: "16px", cursor: "pointer" }} />
          <PhoneIcon sx={{ marginRight: "16px", cursor: "pointer" }} />
          <VideocamIcon sx={{ marginRight: "16px", cursor: "pointer" }} />
        </Box>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {data.currentRoom?.type === "group" ? (
          <Box sx={style}>
            <Box>
              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 10px",
                }}
              >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Thông tin nhóm
                </Typography>
                <CloseIcon onClick={() => handleClose()} />
              </Box>
            </Box>
            <img
              src="https://images.viblo.asia/0c004024-e96f-46a5-b42f-e98ad77fd095.jpg"
              style={{ width: "100%" }}
            />
            <Typography
              id="modal-modal-description"
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                textAlign: "center",
                border: "1px solid #333",
                backgroundColor: "#74b9ff",
                color: "#fff",
              }}
            >
              {data.currentRoom?.type === "single"
                ? getRemainUserForSingleRoom(data.currentRoom, data.user?._id)
                    ?.username
                : data.currentRoom.name.length > 30
                ? `${data.currentRoom.name.substring(0, 30)}...`
                : data.currentRoom.name}
              <BorderColorIcon
                sx={{
                  fontSize: "15px",
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
              />
            </Typography>
            <Typography sx={{ padding: "10px" }}>
              Danh sách thành viên nhóm
            </Typography>

            <Box
              sx={{
                width: "100%",
                border: "1px solid #b2bec3",
                maxHeight: "360px",
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
              {data?.currentRoom?.users.map((user, index) => (
                <Box
                  key={index}
                  sx={{
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <img
                    src={user?.image}
                    style={{
                      height: "40px",
                      width: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <Typography>{user?.username}</Typography>
                  <div>
                    <Button
                      id="demo-positioned-button"
                      aria-controls={openMenu ? "demo-positioned-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMenu ? "true" : undefined}
                      onClick={handleClickMenu}
                      sx={{ position: "relative" }}
                    >
                      <MoreHorizIcon/>
                    </Button>
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl}
                      open={openMenu}
                      onClose={handleCloseMenu}
                      // anchorOrigin={{
                      //   vertical: 'top',
                      //   horizontal: 'left',
                      // }}
                      // transformOrigin={{
                      //   vertical: 'top',
                      //   horizontal: 'left',
                      // }}
                      sx={{position: "absolute"}}
                    >
                      <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                      <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
                      <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
                    </Menu>
                  </div>
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                padding: "20px",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <OutputIcon sx={{ color: "#e74c3c" }} />

              <Button
                sx={{ color: "#e74c3c" }}
                onClick={() => handleLeaveGroup()}
              >
                Rời khỏi nhóm
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={style}>
            <Box>
              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 10px",
                }}
              >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Thông tin tài khoản
                </Typography>
                <CloseIcon onClick={() => handleClose()} />
              </Box>
            </Box>
            <img
              src="https://images.pexels.com/photos/17841163/pexels-photo-17841163/free-photo-of-thien-nhien-chim-bay-d-ng-v-t-an-th-t.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              style={{ width: "100%" }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: 40,
              }}
            >
              <img
                alt={
                  data.currentRoom?.type === "single"
                    ? getRemainUserForSingleRoom(
                        data.currentRoom,
                        data.user?._id
                      )?.username
                    : "User Avatar"
                }
                src={
                  data.currentRoom?.type === "single"
                    ? getRemainUserForSingleRoom(
                        data.currentRoom,
                        data.user?._id
                      )?.image ||
                      "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                    : data.currentRoom?.image ||
                      "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                }
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  position: "relative",
                  top: "-26px",
                  left: "20px",
                }}
              />

              <Typography
                id="modal-modal-description"
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginLeft: "40px",
                }}
              >
                {data.currentRoom?.type === "single"
                  ? getRemainUserForSingleRoom(data.currentRoom, data.user?._id)
                      ?.username
                  : data.currentRoom.name.length > 30
                  ? `${data.currentRoom.name.substring(0, 30)}...`
                  : data.currentRoom.name}
                <BorderColorIcon
                  sx={{
                    fontSize: "15px",
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                />
              </Typography>
            </Box>
            <Box
              sx={{
                margin: "20px",
                padding: "6px 10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Button
                variant="contained"
                sx={{ fontWeight: "bold" }}
                onClick={() => handleSendRequestAddFriend(otherUser)}
              >
                {friendshipStatus === "Người lạ" ? "Kết bạn" : "Gọi điện"}
              </Button>
              <Button variant="contained" onClick={() => handleClose()}>
                Nhắn tin
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "20px",
                cursor: "pointer",
              }}
              onClick={() =>
                handleUnFriend(
                  getRemainUserForSingleRoom(data.currentRoom, data.user?._id)
                )
              }
            >
              <DeleteOutlineIcon />
              <Typography>Xóa khỏi danh sách bạn bè</Typography>
            </Box>
          </Box>
        )}
      </Modal>
    </Grid>
  );
};

export default HeadingChat;
