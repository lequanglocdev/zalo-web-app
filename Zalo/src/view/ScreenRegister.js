import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TextInput,
  Pressable,
  Alert, // Import Alert
} from "react-native";
import React, { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import localStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { globalContext } from "../context/globalContext";

export default function ScreenRegister({ navigation, route }) {
  const { selectedLanguage } = route.params || "vi";
  const [showPassword, setShowPassword] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const { globalHandler } = useContext(globalContext);
  const registerText = selectedLanguage === "vi" ? "Đăng ký" : "Register";
  const [data, setData] = useState({
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const Register = async () => {
    // Kiểm tra xem tất cả các trường thông tin đã được điền
    if (
      !data.username ||
      !data.phone ||
      !data.password ||
      !data.confirmPassword ||
      !data.email
    ) {
      Alert.alert(
        selectedLanguage === "vi" ? "Thông báo" : "Notification",
        selectedLanguage === "vi"
          ? "Vui lòng nhập đầy đủ thông tin."
          : "Please enter all required information.",
        [{ text: "OK" }]
      );
      return;
    }

    if (data.password !== data.confirmPassword) {
      Alert.alert(
        selectedLanguage === "vi" ? "Thông báo" : "Notification",
        selectedLanguage === "vi"
          ? "Mật khẩu nhập lại không khớp."
          : "Passwords do not match."[{ text: "OK" }]
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.1.124:5000/v1/auth/register",
        data,
        {
          headers: { "Content-type": "application/json" },
        }
      );
      localStorage.setItem("userData", JSON.stringify(response.data));
      // Hiển thị thông báo khi đăng ký thành công
      Alert.alert(
        selectedLanguage === "vi" ? "Thông báo" : "Notification",
        selectedLanguage === "vi"
          ? "Đăng ký thành công!"
          : "Registration successful!",
        [
          {
            text: "OK",
            onPress: () => {
              globalHandler.setUser(response.data);
              navigation.navigate("Otp");
            },
          },
        ]
      );
    } catch (error) {
      console.log(error);
    }
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
              <Text style={{ fontSize: 18, color: "white" }}>
                {selectedLanguage === "vi" ? "Đăng ký" : "Register"}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <Text style={{ marginLeft: 10, marginTop: 20, fontSize: 13 }}>
        {selectedLanguage === "vi" ? "Vui lòng đăng ký" : "Please register"}
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
              selectedLanguage === "vi" ? "Tên người dùng" : "UserName"
            }
            value={data.username}
            onChangeText={(text) => {
              setData({ ...data, username: text });
              setHasContent(!!text.trim()); // Cập nhật trạng thái dựa trên việc có nội dung hay không
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
          ></TextInput>
          <Pressable
            onPress={() => {
              // Xóa nội dung trong inputName khi biểu tượng xóa được nhấn
              setData({ ...data, username: "" });
            }}
            style={{ marginLeft: 120 }}
          >
            <Feather name="delete" size={24} color="blue" />
          </Pressable>
        </View>
        <View
          style={{ width: 350, borderWidth: 1, borderColor: "#DCDCDC" }}
        ></View>
      </View>

      <View
        style={{
          width: 420,
          marginLeft: 20,
          marginTop: 20,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder={selectedLanguage === "vi" ? "Số điện thoại" : "Phone"}
            value={data.phone}
            onChangeText={(text) => {
              setData({ ...data, phone: text });
              setHasContent(!!text.trim()); // Cập nhật trạng thái dựa trên việc có nội dung hay không
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
          ></TextInput>
          <Pressable
            onPress={() => {
              // Xóa nội dung trong inputName khi biểu tượng xóa được nhấn
              setData({ ...data, phone: "" });
            }}
            style={{ marginLeft: 120 }}
          >
            <Feather name="delete" size={24} color="blue" />
          </Pressable>
        </View>
        <View
          style={{ width: 350, borderWidth: 1, borderColor: "#DCDCDC" }}
        ></View>
      </View>

      <View
        style={{
          width: 420,
          marginLeft: 20,
          marginTop: 20,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder={selectedLanguage === "vi" ? "Mật Khẩu" : "Password"}
            value={data.password}
            onChangeText={(text) => {
              setData({ ...data, password: text });
              setHasContent(!!text.trim()); // Cập nhật trạng thái dựa trên việc có nội dung hay không
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
          ></TextInput>
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={{ marginLeft: 120 }}
          >
            {showPassword == true ? (
              <AntDesign name="eye" size={20} color="#116CF5" />
            ) : (
              <Entypo name="eye-with-line" size={20} color="#116CF5" />
            )}
          </Pressable>
        </View>
        <View
          style={{ width: 350, borderWidth: 1, borderColor: "#DCDCDC" }}
        ></View>
      </View>

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
              selectedLanguage === "vi"
                ? "Nhập lại mật Khẩu"
                : "Confirm Password"
            }
            value={data.confirmPassword}
            onChangeText={(text) => {
              setData({ ...data, confirmPassword: text });
              setHasContent(!!text.trim()); // Cập nhật trạng thái dựa trên việc có nội dung hay không
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
          ></TextInput>
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={{ marginLeft: 120 }}
          >
            {showPassword == true ? (
              <AntDesign name="eye" size={20} color="#116CF5" />
            ) : (
              <Entypo name="eye-with-line" size={20} color="#116CF5" />
            )}
          </Pressable>
        </View>
        <View
          style={{ width: 350, borderWidth: 1, borderColor: "#DCDCDC" }}
        ></View>
      </View>

      <View
        style={{
          marginLeft: 20,
          marginTop: 20,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder={selectedLanguage === "vi" ? "Email" : "Email"}
            value={data.email}
            onChangeText={(text) => {
              setData({ ...data, email: text });
              setHasContent(!!text.trim()); // Cập nhật trạng thái dựa trên việc có nội dung hay không
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
          ></TextInput>
          <Pressable
            onPress={() => {
              // Xóa nội dung trong inputName khi biểu tượng xóa được nhấn
              setData({ ...data, email: "" });
            }}
            style={{ marginLeft: 120 }}
          >
            <Feather name="delete" size={24} color="blue" />
          </Pressable>
        </View>
        <View
          style={{ width: 350, borderWidth: 1, borderColor: "#DCDCDC" }}
        ></View>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable
          onPress={Register}
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
            {registerText}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
