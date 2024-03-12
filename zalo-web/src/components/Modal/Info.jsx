import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "1px solid #333",
  borderRadius: "6px",
};
const Info = ({ handleCloseModal }) => {
  const handleOpenModal = (event) => {
    handleCloseModal(event);
  };
  return (
    <div>
      <Box sx={style}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography id="modal-modal-description">
            Thông tin tài khoản
          </Typography>
          <Button onClick={handleOpenModal}>
            <CloseIcon sx={{color:"#333"}}/>
          </Button>
        </Box>
        <Box>
          <CardMedia
            sx={{ height: 140, objectFit: "cover" }}
            image="https://images.pexels.com/photos/17841163/pexels-photo-17841163/free-photo-of-thien-nhien-chim-bay-d-ng-v-t-an-th-t.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            title="green iguana"
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: 40,
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src="https://images.pexels.com/photos/17841163/pexels-photo-17841163/free-photo-of-thien-nhien-chim-bay-d-ng-v-t-an-th-t.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              sx={{
                width: 70,
                height: 70,
                position: "relative",
                top: "-6px",
                right: "-30px",
              }}
            />
            <Typography
              id="modal-modal-description"
              sx={{ marginLeft: "50px" }}
            >
              Lê Quang Lộc
              <BorderColorIcon
                sx={{ fontSize: "16px", marginLeft: "20px", cursor: "pointer" }}
              />
            </Typography>
          </Box>

          <Box sx={{ m: 2 }}>
            <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
              Thông tin cá nhân
            </Typography>
            
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Info;
