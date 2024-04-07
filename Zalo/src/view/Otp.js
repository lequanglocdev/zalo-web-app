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
  const [hasContent, setHasContent] = useState(false);

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

  const handleOtpChange = (text, index) => {
    // Tạo một bản sao của mảng otp để thay đổi giá trị của ô OTP tại vị trí cụ thể.
    const newOtp = [...otp];
    // Gán giá trị text vào vị trí cụ thể của mảng newOtp, được xác định bởi chỉ số index.
    newOtp[index] = text;
    // Cập nhật giá trị của state otp bằng cách ghép các phần tử trong mảng newOtp thành một chuỗi và gán vào state otp.
    setOtp(newOtp.join(""));
    // Xác định xem có nội dung nào được nhập vào ô OTP không bằng cách kiểm tra xem có ký tự nào khác khoảng trắng không trong mảng newOtp.
    // Nếu có ít nhất một ký tự không phải khoảng trắng, hasContent được đặt thành true, ngược lại hasContent được đặt thành false.
    // Điều này ảnh hưởng đến việc hiển thị trạng thái của nút Xác nhận.
    setHasContent(newOtp.some((char) => char.trim().length > 0));
  };

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
          navigation.navigate("Dateofbirth");
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

      <View style={{ alignItems: "center", marginTop: 15 }}>
        <Feather name="phone-incoming" size={50} color="green" />
      </View>

      <View style={{ alignItems: "center", marginTop: 10 }}>
        {/* Hộp chứa các ô nhập số */}
        <View style={{ flexDirection: "row" }}>
          {[...Array(6)].map((_, index) => (
            <TextInput
              key={index}
              style={{
                width: 40,
                height: 38,
                fontSize: 15,
                fontWeight: "bold",
                color: "#BABABA",
                borderWidth: 1,
                borderColor: "#BABABA",
                textAlign: "center",
                marginHorizontal: 5,
                caretColor: "blue",
              }}
              keyboardType="numeric"
              maxLength={1} // Giới hạn độ dài tối đa là 1 chữ số
              onChangeText={(text) => handleOtpChange(text, index)}
              value={otp[index]}
            />
          ))}
        </View>
        {/* Đường gạch đứt khúc */}
        <View
          style={{
            marginTop: 5,
            width: 250,
            borderBottomWidth: 1,
            borderBottomColor: "#BABABA",
            borderStyle: "dotted", // Đặt kiểu đường viền là gạch đứt khúc
          }}
        />
      </View>

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Pressable
          onPress={() => {
            handleSubmitOTPWithPhoneNumber();
          }}
          style={{
            width: 350,
            height: 50,
            backgroundColor: hasContent ? "#116CF5" : "#DCDCDC",
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
