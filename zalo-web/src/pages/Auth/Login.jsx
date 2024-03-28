import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import { Navigate, useNavigate } from "react-router-dom";
import InputForm from "../../components/InputForm";
import ButtonComponents from "../../components/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Swal from "sweetalert2";
import { api, typeHTTP } from "../../utils/api";
import { globalContext } from "../../context/globalContext";
import { Stack } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
const Login = () => {
  const nav = useNavigate();
  const { data, handler } = useContext(globalContext);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [login, setlogin] = useState({
    phone: "",
    password: "",
  });
  const [invalidFiels, setInvalidFiels] = useState([]);

  //xử lý đăng nhập tài khoản
  const loginUser = async () => {
    const body = {
      phone: login.phone,
      password: login.password,
    };
    api({ method: typeHTTP.POST, url: "/auth/login", body }).then((res) => {
      handler.setUser(res);
      nav("/home");
    });
  };
  const ClickRegister = () => {
    nav("/register");
  };
  return (
    <Stack
      sx={{
        backgroundColor: "#b3e0ff",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h3" style={{ color: "#00a8ff", fontWeight: 500 }}>
          Zalo
        </Typography>
        <Typography variant="span">
          Đăng nhập tài khoản Zalo <br />
          để kết nối với ứng dụng Zalo Web
        </Typography>
      </Box>

      <Box
        style={{
          width: "400px",
          minHeight: "300px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
          marginTop: "15px",
        }}
      >
        <InputForm
          label={"số điện thoại"}
          value={login.phone}
          setValue={setlogin}
          type={"phone"}
          name="phone"
          setInvalidFiels={setInvalidFiels}
          invalidFiels={invalidFiels}
        />
        <InputForm
          label={"mật khẩu"}
          value={login.password}
          setValue={setlogin}
          type={"password"}
          name="password"
          setInvalidFiels={setInvalidFiels}
          invalidFiels={invalidFiels}
        />
        <ButtonComponents text={"Đăng nhập"} onClick={loginUser} />
        <Box
          style={{
            marginTop: "20px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="span"
            style={{
              marginLeft: "6px",
              color: "#3498db",
              cursor: "pointer",
            }}
          >
            Quên mật khẩu
          </Typography>

          <Typography variant="span" style={{ marginTop: "10px" }}>
            Bạn chưa có tài khoản?
            <Typography
              variant="span"
              style={{
                marginLeft: "6px",
                color: "#3498db",
                cursor: "pointer",
              }}
              onClick={ClickRegister}
            >
              Đăng ký
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export default Login;
