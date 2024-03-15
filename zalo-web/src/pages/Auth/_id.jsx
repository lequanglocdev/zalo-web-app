import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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

import InputForm from "../../components/InputForm";
import ButtonComponents from "../../components/Button";
import Typography from "@mui/material/Typography";

import axios from "axios";

const Auth = () => {
  const nav = useNavigate();

  // const [value, setValue] = React.useState("1");

  const [register, setRegister] = useState(location.state?.flag);

  const [data, setData] = useState({
    username: "",
    phone: "",
    password: "",
    email: "",
  });

  const loginUser = async () => {
    try {
      const respone = await axios.post(
        "http://localhost:5000/v1/auth/login",
        {
          phone: data.phone, // Lấy giá trị phone từ data
          password: data.password, // Lấy giá trị password từ data
        },
        {
          headers: { "Content-type": "application/json" },
        }
      );

      localStorage.setItem("userData", JSON.stringify(respone));
      nav("Home");
    } catch (error) {
      console.log("error", error);
    }
  };
  const registerUser = async () => {
    try {
      const respone = await axios.post(
        "http://localhost:5000/v1/auth/register",
        {
          username: data.username,
          email: data.email,
          phone: data.phone,
          password: data.password,
        },
        {
          headers: { "Content-type": "application/json" },
        }
      );
      console.log(respone);
      localStorage.setItem("userData", JSON.stringify(respone));
      console.log("register OK");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: "#b3e0ff",
        height: "100vh",
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
        <Typography
          sx={{
            padding: "6px",
            fontSize: "30px",
            fontWeight: "500",
            color: "#008ae6",
            textAlign: "center",
          }}
        >
          {register ? "Đăng ký" : "Đăng nhập"}
        </Typography>
        {register && (
          <>
            <InputForm
              label={"Họ Tên"}
              value={data.username}
              setValue={setData}
              type={"username"}
              name="username"
            />
            <InputForm
              label={"Họ Tên"}
              value={data.email}
              setValue={setData}
              type={"email"}
              name="email"
            />
          </>
        )}

        <InputForm
          label={"Số điện thoại"}
          value={data.phone}
          setValue={setData}
          type={"phone"}
          name="phone"
        />
        <InputForm
          label={"Password"}
          value={data.password}
          setValue={setData}
          type="password"
          name="password"
        />
        <ButtonComponents
          text={register ? "Đăng kí" : "Đăng nhập"}
          onClick={register ? registerUser : loginUser}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            padding: 2,
          }}
        >
          {register ? (
            <>
              Bạn đã có tài khoản ?
              <Typography
                onClick={() => setRegister(false)}
                variant="span"
                sx={{ cursor: "pointer" }}
              >
                Đăng nhập ngay
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="span">Bạn quên mật khẩu</Typography>
              <Typography
                onClick={() => setRegister(true)}
                variant="span"
                sx={{ cursor: "pointer" }}
              >
                Tạo tài khoản
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;
