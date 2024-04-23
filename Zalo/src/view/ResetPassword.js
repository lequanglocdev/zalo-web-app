import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { globalContext } from "../context/globalContext";
import { Ionicons } from "@expo/vector-icons";
import { api, baseURLOrigin, typeHTTP } from "../utils/api";

export default function ResetPassword({ navigation }) {
  const [sendmail, setSendmail] = useState("");
  const { globalData, globalHandler } = useContext(globalContext);

  const handleForgetPassword = async () => {
    const body = {
      email: sendmail,
    };
    console.log(body);

    try {
      const res = await api({
        method: typeHTTP.POST,
        url: "/auth/forgetPassword",
        body: body,
      });
      globalHandler.setUser(res);
      console.log("dau ra sendmail", res);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <ScrollView>
      <ImageBackground
        source={require("../image/Untitled.png")}
        style={{ width: 420, height: 100 }}
      >
        <View style={{ flexDirection: "row" }}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={{ marginLeft: 20, marginTop: 60 }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>

          <Text
            style={{
              fontSize: 16,
              color: "white",
              marginTop: 62,
              marginLeft: 10,
              fontWeight: 700,
            }}
          >
            Lấy Mật Khẩu
          </Text>
        </View>
      </ImageBackground>

      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          marginTop: 15,
          marginLeft: 10,
        }}
      >
        Nhập email để lấy mật khẩu
      </Text>

      <View
        style={{
          width: 400,
          height: 50,
          borderRadius: 90,
          justifyContent: "center",
          marginTop: 20,
          marginLeft: 10,
          backgroundColor: "#DCDCDC",
        }}
      >
        <TextInput
          value={sendmail}
          placeholder="nhâp email"
          onChangeText={(text) => {
            setSendmail(text);
          }}
          style={{
            width: 200,
            fontSize: 15,
            fontWeight: "bold",
            color: "blue",
            outlineStyle: "none",
            caretColor: "blue", // Set caret color to blue
            marginLeft: 15,
          }}
        />
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Pressable
          onPress={() => handleForgetPassword()}
          style={{
            width: 100,
            height: 50,
            borderRadius: 90,
            marginTop: 30,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#00BFFF",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
            Submit
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
