import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
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
const AddFriend = ({ handleCloseModalAddFriend }) => {
  const handleOpenModal = (event) => {
    handleCloseModalAddFriend(event);
  };
  return (
    <div>
      <Box sx={style}>jdnlkandlak</Box>;
    </div>
  );
};

export default AddFriend;
