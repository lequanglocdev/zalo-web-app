// ScreenLogin.js
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import axios from "axios";
import { Ionicons, AntDesign, Entypo, Feather } from "@expo/vector-icons";
import localStorage from "@react-native-async-storage/async-storage";
import { globalContext } from "../context/globalContext";

export default function ScreenLogin({ navigation, route }) {
  const { selectedLanguage } = route.params || { selectedLanguage: "vi" };
  const [data, setData] = useState({ phone: "0941432773", password: "123456" });
  const { globalHandler } = useContext(globalContext);
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState(selectedLanguage);
  // State hook để theo dõi trạng thái của nội dung trong ô nhập tên
  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    setLanguage(selectedLanguage);
  }, [selectedLanguage]);

  const Login = async () => {
    // Kiểm tra xem số điện thoại không được để trống
    if (!data.phone.trim()) {
      Alert.alert(
        selectedLanguage === "vi" ? "Thông báo" : "Notification",
        selectedLanguage === "vi"
          ? "Vui lòng nhập số điện thoại."
          : "Please enter your phone number.",
        [{ text: "OK" }]
      );
      return;
    }

    // Kiểm tra xem mật khẩu không được để trống
    if (!data.password.trim()) {
      Alert.alert(
        selectedLanguage === "vi" ? "Thông báo" : "Notification",
        selectedLanguage === "vi"
          ? "Vui lòng nhập mật khẩu."
          : "Please enter your password.",
        [{ text: "OK" }]
      );
      return;
    }

    // Kiểm tra xem số điện thoại có ít nhất 10 số không
    if (data.phone.trim().length < 10) {
      Alert.alert(
        selectedLanguage === "vi" ? "Thông báo" : "Notification",
        selectedLanguage === "vi"
          ? "Số điện thoại phải có ít nhất 10 số."
          : "Phone number must be at least 10 digits.",
        [{ text: "OK" }]
      );
      return;
    }

    // Kiểm tra xem mật khẩu có ít nhất 6 kí tự không
    if (data.password.trim().length < 6) {
      Alert.alert(
        selectedLanguage === "vi" ? "Thông báo" : "Notification",
        selectedLanguage === "vi"
          ? "Mật khẩu phải có ít nhất 6 kí tự."
          : "Password must be at least 6 characters.",
        [{ text: "OK" }]
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.1.86:5000/v1/auth/login",
        data,
        {
          headers: { "Content-type": "application/json" },
        }
      );
      globalHandler.setUser(response.data);
      localStorage.setItem("userData", JSON.stringify(response.data));
      navigation.navigate("Message"); //, { selectedLanguage });
    } catch (error) {
      console.log(error);
      Alert.alert(
        selectedLanguage === "vi" ? "Thông báo" : "Notification",
        selectedLanguage === "vi"
          ? "Số điện thoại hoặc mật khẩu không chính xác."
          : "Incorrect phone number or password.",
        [{ text: "OK" }]
      );
    }
  };

  const loginText = selectedLanguage === "vi" ? "Đăng nhập" : "Login";

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
              <Text style={{ fontSize: 18, color: "white" }}>
                {selectedLanguage === "vi" ? "Đăng Nhập" : "Login"}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <Text style={{ marginLeft: 10, marginTop: 20, fontSize: 13 }}>
        {selectedLanguage === "vi"
          ? "Vui lòng nhập số điện thoại và mật khẩu để đăng nhập"
          : "Please enter your phone number and password to log in"}
      </Text>

      <View
        style={{
          width: 420,
          marginLeft: 20,
          marginTop: 20,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder={
              selectedLanguage === "vi" ? "Tên đăng nhập" : "Username"
            }
            value={data.phone}
            onChangeText={(text) => {
              setData({ ...data, phone: text });
              setHasContent(!!text.trim());
            }}
            style={{
              width: 200,
              height: 38,
              fontSize: 15,
              fontWeight: "bold",
              color: "#BABABA",
              outlineStyle: "none",
              caretColor: "blue", // Set caret color to blue
            }}
          />
          <Pressable
            onPress={() => {
              setData({ ...data, phone: "" });
            }}
            style={{ marginLeft: 120 }}
          >
            <Feather name="delete" size={24} color="blue" />
          </Pressable>
        </View>
        <View style={{ width: 350, borderWidth: 1, borderColor: "#DCDCDC" }} />
      </View>

      <View
        style={{
          marginLeft: 20,
          marginTop: 20,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder={selectedLanguage === "vi" ? "Mật khẩu" : "Password"}
            value={data.password}
            onChangeText={(text) => {
              setData({ ...data, password: text });
              setHasContent(!!text.trim());
            }}
            secureTextEntry={!showPassword}
            style={{
              width: 200,
              height: 38,
              fontSize: 15,
              fontWeight: "bold",
              color: "#BABABA",
              outlineStyle: "none",
              caretColor: "blue", // Set caret color to blue
            }}
          />
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={{ marginLeft: 120 }}
          >
            {showPassword ? (
              <AntDesign name="eye" size={20} color="#116CF5" />
            ) : (
              // Ngược lại, nếu đang ẩn mật khẩu, hiển thị biểu tượng mắt đóng
              <Entypo name="eye-with-line" size={20} color="#116CF5" />
            )}
          </Pressable>
        </View>
        <View style={{ width: 350, borderWidth: 1, borderColor: "#DCDCDC" }} />
      </View>

      <Pressable
        onPress={() => {
          navigation.navigate("ResetPassword");
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: "blue",
            marginLeft: 20,
            marginTop: 20,
          }}
        >
          {selectedLanguage === "vi" ? "Lấy lại mật khẩu" : "Forgot Password"}
        </Text>
      </Pressable>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable
          onPress={Login}
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
              fontSize: 15,
              fontWeight: "bold",
              color: "white",
              fontWeight: 700,
            }}
          >
            {loginText}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
