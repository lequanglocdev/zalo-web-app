import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

export default function SendMessager({ navigation }) {
  // const [message, setMessage] = useState("");
  const [showSendButton, setShowSendButton] = useState(false);

  const handleMessageChange = (text) => {
    // setMessage(text);
    setShowSendButton(text !== ""); // Hiển thị nút gửi nếu có nội dung trong tin nhắn
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" || "android" ? "padding" : null} //sử dụng để điều chỉnh giao diện khi bàn phím xuất hiện hoặc biến mất trên màn hình.
    >
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../image/Untitled.png")}
          style={{ width: 420, height: 100 }}
        >
          <View style={{ flexDirection: "row", marginTop: 60, marginLeft: 20 }}>
            <Pressable
              onPress={() => navigation.goBack("Message")}
              style={{ marginTop: 5 }}
            >
              <AntDesign name="arrowleft" size={24} color="#fff" />
            </Pressable>
            <View style={{ marginLeft: 20, marginTop: 6 }}>
              <Text style={{ fontSize: 16, color: "#fff" }}>
                Nguyễn Thị Kiều Nghi
              </Text>
            </View>
            <View style={{ marginLeft: 80 }}>
              <AntDesign name="phone" size={24} color="white" />
            </View>
            <View style={{ marginLeft: 20 }}>
              <AntDesign name="videocamera" size={24} color="white" />
            </View>
            <View style={{ marginLeft: 20 }}>
              <Feather name="list" size={24} color="white" />
            </View>
          </View>
        </ImageBackground>
        <ScrollView></ScrollView>
        <View
          style={{
            height: 100,
            backgroundColor: "white",
            alignItems: "flex-start",
            flexDirection: "row",
          }}
        >
          <Pressable style={{ marginLeft: 10, marginTop: 10 }}>
            <Feather name="smile" size={24} color="#808080" />
          </Pressable>
          <TextInput
            placeholder="Tin nhắn"
            // value={message}
            onChangeText={handleMessageChange}
            style={{
              width: 260,
              fontSize: 18,
              color: "black",
              outlineStyle: "none",
              marginLeft: 10,
              marginTop: 13,
            }}
            placeholderTextColor="#808080"
          />
          {showSendButton && (
            <Pressable
              onPress={handleMessageChange}
              style={{ marginTop: 10, marginLeft: 70 }}
            >
              <Ionicons name="send-sharp" size={24} color="blue" />
            </Pressable>
          )}
          {!showSendButton && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
                marginTop: 10,
              }}
            >
              <Pressable>
                <MaterialCommunityIcons
                  name="dots-horizontal"
                  size={24}
                  color="#808080"
                />
              </Pressable>
              <Pressable style={{ marginLeft: 10 }}>
                <Feather name="mic" size={24} color="#808080" />
              </Pressable>
              <Pressable style={{ marginLeft: 10 }}>
                <AntDesign name="picture" size={24} color="#FFD700" />
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}