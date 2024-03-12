import { useColorScheme } from "@mui/material/styles";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";

function ModelSelect() {
  const { mode, setMode } = useColorScheme();
  const handleChange = (event) => {
    // setAge(event.target.value);
    const select = event.target.value;
    setMode(select);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel
        id="lable-light-dark-mode"
        sx={{
          color: "white",
          "&.Mui-focused": { color: "white" },
        }}
      >
        Mode
      </InputLabel>
      <Select
        labelId="lable-light-dark-mode"
        id="select-light-dark-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{
          color: "white",
          ".MuiOutlinedInput-notchedOutline": { borderColor: "white" },
          " &:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
          " &.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          ".MuiSvgIcon-root ": { color: "white" },
        }}
      >
        <MenuItem value="light">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <LightModeIcon /> Light
          </div>
        </MenuItem>
        <MenuItem value="dark">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <DarkModeIcon /> Dark
          </div>
        </MenuItem>
        <MenuItem value="system">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <SettingsBrightnessIcon /> System
          </div>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default ModelSelect;
