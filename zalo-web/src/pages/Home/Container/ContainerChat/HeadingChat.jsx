import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SearchIcon from "@mui/icons-material/Search";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import { getRemainUserForSingleRoom } from "../../../../utils/getRemainUserForSingleRoom";

import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Info from "../../../../components/Info";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { globalContext } from "../../../../context/globalContext";
import { api, typeHTTP } from "../../../../utils/api";
import { useNavigate } from "react-router-dom";
import { Button, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import BorderColorIcon from "@mui/icons-material/BorderColor";
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
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const HeadingChat = () => {
  const { data, handler } = useContext(globalContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  // const handleDeleteFrend = (toUser) => {
  //   const body = {
  //     fromUser: data.user._id,
  //     toUser: toUser._id,
  //   };
  //   // console.log( body)
  //   api({
  //     body: body,
  //     url: "/user/unfriend",
  //     method: typeHTTP.POST,
  //   }).then((res) => {
  //     console.log(res);
  //   });
  // };
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
              {data.currentRoom?.type === "single"
                ? getRemainUserForSingleRoom(data.currentRoom, data.user?._id)
                    ?.username
                : data.currentRoom.name.length > 30
                ? `${data.currentRoom.name.substring(0, 30)}...`
                : data.currentRoom.name}
            </Box>
            <Box style={{ fontSize: "14px", color: "#7589A3" }}>
              {data.currentRoom?.type === "group"
                ? `${data.currentRoom?.users.length} thanh vien`
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
            src="https://images.pexels.com/photos/17841163/pexels-photo-17841163/free-photo-of-thien-nhien-chim-bay-d-ng-v-t-an-th-t.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            style={{ width: "10%",borderRadius:"50%" }}
          />
           
            <Typography
              id="modal-modal-description"
              sx={{ fontSize: "20px", fontWeight: "bold" }}
            >
              Minh
              <BorderColorIcon
                sx={{ fontSize: "15px", marginLeft: "10px", cursor: "pointer" }}
              />
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
};

export default HeadingChat;
