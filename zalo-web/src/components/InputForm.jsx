import React, { isValidElement, memo } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const InputForm = ({
  label,
  value,
  setValue,
  keyPayload,
  type,
  invalidFiels =[],
}) => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "43ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        error
        id="outlined-multiline-flexible"
        type={type || "text"}
        label={label}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [type]: e.target.value }))
        }
        helperText="abc"
      />
      {invalidFiels.length > 0 && invalidFiels.some(i => i.name === type) && (
        <Typography variant="span" sx={{ color: "red" }}>
          {invalidFiels.find((i) => i.name === type)?.message}
        </Typography>
      )}
    </Box>
  );
};

export default memo(InputForm);
