import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import PhoneIcons from "@mui/icons-material/PhoneAndroid";
import LockIcons from "@mui/icons-material/Lock";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const Auth = () => {
  const nav = useNavigate();

  const login = () => {
    nav("home");
  };
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [Code, setCode] = React.useState("+84");
  const handle = (event) => {
    setCode(event.target.value);
  };
  const handlePhone = (event) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
  };

  return (
    <Box
      sx={{
        backgroundColor: "#b3e0ff",
        height: "732px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ fontSize: "60px", fontWeight: "bold", color: "#008ae6" }}>
        ZaLo
      </div>
      <div style={{ fontSize: "17px", textAlign: "center" }}>
        Đăng nhập tài khoản Zalo <br /> để kết nối với ứng dụng Zalo Web
      </div>

      <Box
        sx={{
          width: "400px",
          height: "365px",
          borderRadius: "3px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
          marginTop: "15px",
        }}
      >
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TabList onChange={handleChange}>
              <Tab label="VỚI MÃ QR" value="1" />
              <Tab
                sx={{ marginLeft: "50px" }}
                label="VỚI SỐ ĐIỆN THOẠI"
                value="2"
              />
            </TabList>
          </Box>
          <TabPanel
            sx={{ textAlign: "center ", color: "#4d4d4d", fontSize: "13px" }}
            value="1"
          >
            Sử dụng ứng dụng Zalo để quét mã QR
          </TabPanel>
          <TabPanel value="2">
            <Box sx={{ width: "305px", marginLeft: "20px" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "40px",
                }}
              >
                <PhoneIcons sx={{ marginTop: "15px" }}></PhoneIcons>
                <FormControl
                  fullWidth
                  sx={{ marginTop: "15px", width: "110px" }}
                >
                  <Select
                    value={Code}
                    onChange={handle}
                    sx={{
                      "& fieldset": {
                        border: "none",
                      },
                    }}
                  >
                    <MenuItem value="+84 ">+84</MenuItem>
                    <MenuItem value="+93">+93 </MenuItem>
                    <MenuItem value="+01">+01 </MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth style={{ marginTop: "14px" }}>
                  <TextField
                    label="Số điện thoại"
                    variant="outlined"
                    fullWidth
                    sx={{
                      "& fieldset": {
                        border: "none",
                      },
                    }}
                    inputProps={{
                      inputMode: "number",
                      pattern: "[0-9]*",
                    }}
                    onInput={handlePhone}
                  />
                </FormControl>
              </Box>
              <hr></hr>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "35px",
                }}
              >
                <LockIcons sx={{ marginTop: "5px" }}></LockIcons>
                <TextField
                  placeholder="Mật khẩu"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  type="password"
                  sx={{
                    "& fieldset": {
                      border: "none",
                    },
                  }}
                ></TextField>
              </Box>
              <hr></hr>
            </Box>
            <Button
              onClick={login}
              variant="text"
              sx={{
                marginLeft: "20px",
                borderRadius: "5px",
                border: "2px solid #66d9fff",
                padding: "10px 20px",
                backgroundColor: "#66d9ff",
                color: "#ffffff",
                width: "305px",
                height: "43px",
                marginTop: "20px",
              }}
            >
              {" "}
              Đăng nhập với mật khẩu
            </Button>
            <Button
              variant="text"
              sx={{
                marginLeft: "20px",
                borderRadius: "5px",
                border: "2px solid #f2f2f2",
                padding: "10px 20px",
                backgroundColor: "#ffffff",
                color: "#66d9ff",
                width: "305px",
                height: "43px",
                marginTop: "10px",
              }}
            >
              {" "}
              Đăng nhập bằng thiết bị di động
            </Button>
            <Button
              sx={{
                marginLeft: "20px",
                fontSize: "12px",
                textAlign: "center",
                marginTop: "15px",
                padding: "20px",
                width: "305px",
                height: "43px",
                color: "black",
              }}
            >
              Quên mật khẩu ?{" "}
            </Button>
          </TabPanel>
        </TabContext>
      </Box>
      <div style={{ marginTop: "50px" }}>
        <Button sx={{ fontSize: "12px" }}>Tiếng Việt</Button>
        <Button sx={{ fontSize: "12px" }}>English</Button>
      </div>
    </Box>
  );
};

export default Auth;
