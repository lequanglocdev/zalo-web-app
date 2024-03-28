// import React, { useContext, useState } from "react";
// import Box from "@mui/material/Box";
// import { Navigate, useNavigate } from "react-router-dom";
// import InputForm from "../../components/InputForm";
// import ButtonComponents from "../../components/Button";
// import Typography from "@mui/material/Typography";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { api, typeHTTP } from "../../utils/api";
// import { globalContext } from "../../context/globalContext";

// const Auth = () => {
//   const nav = useNavigate();
//   const { data, handler } = useContext(globalContext);
//   // location.state?.flag này lúc đầu giá trị của nó là null => false
//   // dùng để check nếu là false thì nó ở trang đăng nhập còn true là trang đăng ký
//   const [register, setRegister] = useState(location.state?.flag);

//   const [info, setInfo] = useState({
//     username: "",
//     phone: "",
//     password: "",
//     email: "",
//   });
//   const [invalidFiels, setInvalidFiels] = useState([]);

//   // xử lý đăng nhập tài khoản
//   const loginUser = async () => {
//     try {
//       let invalids = validate(data);
//       if (invalids.length > 0) {
//         console.log("Dữ liệu không hợp lệ:", invalids);
//         return;
//       }

//       const respone = await axios.post(
//         "http://localhost:5000/v1/auth/login",
//         {
//           phone: info.phone, // Lấy giá trị phone từ data
//           password: info.password, // Lấy giá trị password từ data
//         },
//         {
//           headers: { "Content-type": "application/json" },
//         }
//       );

//       localStorage.setItem("userData", JSON.stringify(respone));
//       nav("home");
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   // xử lý đăng ký tài khoản
//   const registerUser = async () => {
//     const body = {
//       username: info.username,
//       email: info.email,
//       phone: info.phone,
//       password: info.password,
//     };
//     api({ method: typeHTTP.POST, url: "/auth/register", body }).then((res) => {
//       handler.setUser(res);
//       nav("/verification");
//     });

//     // localStorage.setItem("userData", JSON.stringify(respone));
//   };

//   // xử lý ràng buộc dữ liệu
//   const validate = (data) => {
//     let invalids = 0;
//     let fields = Object.entries(data);
//     fields.forEach((item) => {
//       if (item[1] === "")
//         setInvalidFiels((prev) => [
//           ...prev,
//           {
//             name: item[0],
//             message: "Bạn không được bỏ trống trường này",
//           },
//         ]);
//       invalids++;
//     });
//     fields.forEach((item) => {
//       switch (item[0]) {
//         case "password":
//           if (item[1].length < 6) {
//             setInvalidFiels((prev) => [
//               ...prev,
//               {
//                 name: item[0],
//                 message: "Mật khẩu phải có tối thiểu 6 ký tự",
//               },
//             ]);
//             invalids++;
//           }
//           break;
//         case "phone":
//           if (!+item[1]) {
//             setInvalidFiels((prev) => [
//               ...prev,
//               {
//                 name: item[0],
//                 message: "Số điện thoại không hợp lệ",
//               },
//             ]);
//             invalids++;
//           }
//           break;
//         default:
//           break;
//       }
//     });
//     return invalids;
//   };
//   return (
//     <Box
//       sx={{
//         backgroundColor: "#b3e0ff",
//         height: "100vh",
//         display: "flex",
//         gap: 30,
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <div
//         style={{
//           fontSize: "70px",
//           fontWeight: "bold",
//           color: "#008ae6",
//           textAlign: "center",
//         }}
//       >
//         ZaLo
//         <div style={{ fontSize: "20px", textAlign: "center" }}>
//           {register ? " Đăng ký tài khoản Zalo" : "Đăng nhập tài khoản Zalo"}{" "}
//           <br /> để kết nối với ứng dụng Zalo Web
//         </div>
//       </div>

//       {/* Đăng ký tài khoản */}
//       {register ? (
//         <Box
//           sx={{
//             width: "400px",
//             minHeight: "450px",
//             borderRadius: "3px",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//             backgroundColor: "#ffffff",
//             marginTop: "15px",
//           }}
//         >
//           <Typography
//             sx={{
//               padding: "6px",
//               fontSize: "30px",
//               fontWeight: "500",
//               color: "#008ae6",
//               textAlign: "center",
//             }}
//           >
//             {register ? "Đăng ký" : "Đăng nhập"}
//           </Typography>
//           {register && (
//             <>
//               <InputForm
//                 label={"Họ Tên"}
//                 value={info.username}
//                 setValue={setInfo}
//                 type={"username"}
//                 name="username"
//                 setInvalidFiels={setInvalidFiels}
//                 invalidFiels={invalidFiels}
//               />
//               <InputForm
//                 label={"Email"}
//                 value={info.email}
//                 setValue={setInfo}
//                 type={"email"}
//                 name="email"
//                 setInvalidFiels={setInvalidFiels}
//                 invalidFiels={invalidFiels}
//               />
//             </>
//           )}

//           <InputForm
//             label={"Số điện thoại"}
//             value={info.phone}
//             setValue={setInfo}
//             type={"phone"}
//             name="phone"
//             setInvalidFiels={setInvalidFiels}
//             invalidFiels={invalidFiels}
//           />
//           <InputForm
//             label={"Password"}
//             value={info.password}
//             setValue={setInfo}
//             type="password"
//             name="password"
//             setInvalidFiels={setInvalidFiels}
//             invalidFiels={invalidFiels}
//           />
//           <ButtonComponents
//             text={register ? "Đăng kí" : "Đăng nhập"}
//             onClick={register ? registerUser : loginUser}
//           />

//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "flex-end",
//               padding: 2,
//             }}
//           >
//             {register ? (
//               <>
//                 Bạn đã có tài khoản?
//                 <Typography
//                   onClick={() => setRegister(false)}
//                   variant="span"
//                   sx={{ cursor: "pointer", color: "#3498db" }}
//                 >
//                   Đăng nhập ngay
//                 </Typography>
//               </>
//             ) : (
//               <>
//                 <Typography variant="span">Bạn quên mật khẩu</Typography>
//                 <Typography
//                   onClick={() => setRegister(true)}
//                   variant="span"
//                   sx={{ cursor: "pointer" }}
//                 >
//                   Tạo tài khoản
//                 </Typography>
//               </>
//             )}
//           </Box>
//         </Box>
//       ) : (
//         // Đắng nhập tài khoản
//         <Box
//           sx={{
//             width: "400px",
//             minHeight: "300px",
//             borderRadius: "3px",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//             backgroundColor: "#ffffff",
//             marginTop: "15px",
//           }}
//         >
//           <Typography
//             sx={{
//               padding: "6px",
//               fontSize: "30px",
//               fontWeight: "500",
//               color: "#008ae6",
//               textAlign: "center",
//             }}
//           >
//             {register ? "Đăng ký" : "Đăng nhập"}
//           </Typography>
//           {register && (
//             <>
//               <InputForm
//                 label={"Họ Tên"}
//                 value={info.username}
//                 setValue={setInfo}
//                 type={"username"}
//                 name="username"
//                 setInvalidFiels={setInvalidFiels}
//                 invalidFiels={invalidFiels}
//               />
//               <InputForm
//                 label={"Email"}
//                 value={info.email}
//                 setValue={setInfo}
//                 type={"email"}
//                 name="email"
//                 setInvalidFiels={setInvalidFiels}
//                 invalidFiels={invalidFiels}
//               />
//             </>
//           )}

//           <InputForm
//             label={"Số điện thoại"}
//             value={info.phone}
//             setValue={setInfo}
//             type={"phone"}
//             name="phone"
//             setInvalidFiels={setInvalidFiels}
//             invalidFiels={invalidFiels}
//           />
//           <InputForm
//             label={"Password"}
//             value={info.password}
//             setValue={setInfo}
//             type="password"
//             name="password"
//             setInvalidFiels={setInvalidFiels}
//             invalidFiels={invalidFiels}
//           />
//           <ButtonComponents
//             text={register ? "Đăng kí" : "Đăng nhập"}
//             onClick={register ? registerUser : loginUser}
//           />

//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "flex-end",
//               padding: 2,
//             }}
//           >
//             {register ? (
//               <>
//                 Bạn đã có tài khoản ?
//                 <Typography
//                   onClick={() => setRegister(false)}
//                   variant="span"
//                   sx={{ cursor: "pointer" }}
//                 >
//                   Đăng nhập ngay
//                 </Typography>
//               </>
//             ) : (
//               <>
//                 <Typography
//                   variant="span"
//                   sx={{ cursor: "pointer", color: "#e74c3c" }}
//                 >
//                   Bạn quên mật khẩu
//                 </Typography>
//                 <Typography
//                   onClick={() => setRegister(true)}
//                   variant="span"
//                   sx={{ cursor: "pointer", color: "#3498db" }}
//                 >
//                   Tạo tài khoản
//                 </Typography>
//               </>
//             )}
//           </Box>
//         </Box>
//       )}
//     </Box>
//   );
// // };

// export default Auth;
