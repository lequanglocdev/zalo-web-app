import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Pressable,
  TextInput,
} from "react-native";
import React, { useRef, useState, useEffect, useContext } from "react";
import { Ionicons, AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../utils/firebase";
import firebase from "firebase/compat/app";
import { globalContext } from "../context/globalContext";
import { formatPhoneByFireBase } from "../utils/call";
import { api, typeHTTP } from "../utils/api";

export default function Otp({ navigation }) {
  const recaptchaRef = useRef();
  const [otp, setOtp] = useState("");
  const { globalData } = useContext(globalContext);
  const [verification, setVerification] = useState();

  useEffect(() => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(
        formatPhoneByFireBase(globalData.user.phone),
        recaptchaRef.current
      )
      .then((confirmation) => setVerification(confirmation));
  }, [globalData.user]);

  const handleSubmitOTPWithPhoneNumber = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verification,
      otp
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        api({
          method: typeHTTP.POST,
          url: "/user/verification",
          body: { phone: globalData.user.phone },
        }).then((res) => {
          navigation.navigate("Login");
        });
      });
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require("../image/Untitled.png")}
        style={{ width: 420, height: 100 }}
      >
        <View>
          <View style={{ flexDirection: "row", marginTop: 60, marginLeft: 20 }}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
            </Pressable>
            <View style={{ marginLeft: 20, marginTop: 2 }}>
              <Text style={{ fontSize: 18, color: "white" }}>Mã OTP</Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: 400,
            height: 80,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 400 }}>
            Vui lòng không chia sẻ mã xác thực để tránh mất tài khoản
          </Text>
        </View>

        <FirebaseRecaptchaVerifierModal
          ref={recaptchaRef}
          firebaseConfig={firebaseConfig}
        />
      </View>

      <TextInput
        placeholder="Nhập mã"
        onChangeText={(e) => setOtp(e)}
        value={otp}
      />

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Pressable
          onPress={() => {
            handleSubmitOTPWithPhoneNumber();
          }}
          style={{
            width: 350,
            height: 50,
            backgroundColor: "#DCDCDC",
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "white",
              fontWeight: 700,
            }}
          >
            Xác Nhận
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
