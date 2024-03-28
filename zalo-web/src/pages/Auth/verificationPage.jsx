import React, { useContext, useEffect, useState } from "react";
import { globalContext } from "../../context/globalContext";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { formatPhoneByFireBase } from "../../utils/call";
import { Box, Stack } from "@mui/material";

const VerificationPage = () => {
  const { data } = useContext(globalContext);
  const [confirmation, setConfirmation] = useState();
  const [otp, setOtp] = useState("");

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
        console.error("Error sending SMS:", error);
      });
  }, [data.user]);

  const handleSubmitOtp = () => {
    confirmation
      .confirm(otp)
      .then((userCredential) => {
        // update thong tin user xac thuc tai day
        // setUseContent
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
      <Box sx={{ width: "300px", height: "300px", backgroundColor: "#fff" }}>
        <div id="recaptcha"></div>
        <input value={otp} onChange={(e) => setOtp(e.target.value)} />
        <button onClick={() => handleSubmitOtp()}>Submit</button>
      </Box>
    </Stack>
  );
};

export default VerificationPage;
