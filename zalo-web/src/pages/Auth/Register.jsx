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

const Login = () => {
  const nav = useNavigate();
  const { data, handler } = useContext(globalContext);
  // location.state?.flag này lúc đầu giá trị của nó là null => false
  // dùng để check nếu là false thì nó ở trang đăng nhập còn true là trang đăng ký
  // const [register, setRegister] = useState(location.state?.flag);

  const [register, setRegister] = useState({
    username: "",
    phone: "",
    password: "",
    email: "",
  });
  const [invalidFiels, setInvalidFiels] = useState([]);

  const registerUser = async () => {
    const body = {
      username: register.username,
      email: register.email,
      phone: register.phone,
      password: register.password,
    };
    api({ method: typeHTTP.POST, url: "/auth/register", body }).then((res) => {
      handler.setUser(res);
      nav("/verification");
    });

    // localStorage.setItem("userData", JSON.stringify(respone));
  };

  const ClickLogin = () => {
    nav("/");
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
          Đăng ký tài khoản Zalo <br />
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
          label={"Tên"}
          value={register.username}
          setValue={setRegister}
          type={"username"}
          name="username"
          setInvalidFiels={setInvalidFiels}
          invalidFiels={invalidFiels}
        />
        <InputForm
          label={"số điện thoại"}
          value={register.phone}
          setValue={setRegister}
          type={"phone"}
          name="phone"
          setInvalidFiels={setInvalidFiels}
          invalidFiels={invalidFiels}
        />
        <InputForm
          label={"mật khẩu"}
          value={register.password}
          setValue={setRegister}
          type={"password"}
          name="password"
          setInvalidFiels={setInvalidFiels}
          invalidFiels={invalidFiels}
        />
        <InputForm
          label={"email"}
          value={register.email}
          setValue={setRegister}
          type={"email"}
          name="email"
          setInvalidFiels={setInvalidFiels}
          invalidFiels={invalidFiels}
        />
        <ButtonComponents text={"Đăng ký"} onClick={registerUser} />
        <Box
          style={{
            padding: "10px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="span" style={{ marginTop: "10px" }}>
            Bạn đã có tài khoản?
            <Typography
              variant="span"
              style={{
                marginLeft: "6px",
                color: "#3498db",
                cursor: "pointer",
              }}
              onClick={ClickLogin}
            >
              Đăng nhập
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export default Login;
