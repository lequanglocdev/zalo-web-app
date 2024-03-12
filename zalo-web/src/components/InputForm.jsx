import React, { memo } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
const InputForm = ({ label, value, setValue, type }) => {
  return (
    // <div>
    //   <label htmlFor="phone" className="text-xs">
    //     {label}
    //   </label>
    //   <input
    //     type="text"
    //     id="phone"
    //     className=""
    //     value={value}
    //     onChange={(e) =>
    //       setValue((prev) => ({ ...prev, [type]: e.target.value }))
    //     }
    //   />
    // </div>
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "43ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-multiline-flexible" label={label} />
    </Box>
  );
};

export default memo(InputForm);
