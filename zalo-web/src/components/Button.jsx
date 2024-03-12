import * as React from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
const ButtonComponents = ({ text, startIcon }) => {
  return (
    <Button
      variant="contained"
      disableElevation
      startIcon={startIcon}
      sx={{ margin: "auto", display: "block", width: "380px" }}
    >
      {text}
    </Button>
  );
};

export default ButtonComponents;
