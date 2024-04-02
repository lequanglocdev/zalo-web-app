import React, { useContext, useEffect, useState } from "react";
import { globalContext } from "../../context/globalContext";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { formatPhoneByFireBase } from "../../utils/call";
import { Box, Stack, Typography } from "@mui/material";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { api, typeHTTP } from "../../utils/api";
const VerificationPage = () => {
  const { data } = useContext(globalContext);
  const [confirmation, setConfirmation] = useState();
  const [otp, setOtp] = useState("");
  // const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
    console.log(formatPhoneByFireBase(data.user.phone));
    signInWithPhoneNumber(
      auth,
      formatPhoneByFireBase(data.user.phone),
      recaptcha
    )
      .then((confirmationResult) => {
        setConfirmation(confirmationResult);
      })
      .catch((error) => {
        console.error(" sendingError SMS:", error);
      });
  }, [data.user]);

  const handleSubmitOtp = () => {
    confirmation
      .confirm(otp)
      .then((userCredential) => {
        api({
          method: typeHTTP.POST,
          url: "/user/verification",
          body: { phone: data.user.phone },
        }).then(res =>{
          console.log(res)
        });
      })
      .catch((error) => {
        console.error("Error confirming SMS code:", error);
      });
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
      <div id="recaptcha"></div>
      <Box
        sx={{
          height: "300px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "white"
        }}
      >
        <MarkEmailReadIcon sx={{ fontSize: "80px", color: "#3498db" }} />
        <Typography variant="span" sx={{ color: "#3498db" }}>
          tin nhắn đang được gửi đến điện thoại của bạn
        </Typography>
        <Box sx={{ marginTop: "20px" }}>
          <TextField
            sx={{ width: "300px", fontSize: "20px" }}
            label="Mã OTP"
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </Box>

        <Button
          variant="contained"
          sx={{ marginTop: "10px", width: "300px" }}
          onClick={() => handleSubmitOtp()}
        >
          Submit
        </Button>
      </Box>
    </Stack>
  );
};

export default VerificationPage;