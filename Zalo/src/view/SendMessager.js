import React, { useContext, useEffect, useState } from "react";
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
import { globalContext } from "../context/globalContext";
import { io } from "socket.io-client";
import { api, baseURLOrigin, typeHTTP } from "../utils/api";

export default function SendMessager({ navigation, route }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showSendButton, setShowSendButton] = useState(false);
  const recipientName = route.params?.recipientName;
  const { globalData } = useContext(globalContext);
  const socket = io.connect(baseURLOrigin);

  const handleMessageChange = (text) => {
    // setMessage(text);
    setMessage(text);
    setShowSendButton(text !== ""); // Hiển thị nút gửi nếu có nội dung trong tin nhắn
  };

  useEffect(() => {
    api({
      method: typeHTTP.GET,
      url: `/message/get-by-room/${globalData.currentRoom?._id}`,
    }).then((messages) => setMessages(messages));
  }, []);

  useEffect(() => {
    socket.on(globalData.currentRoom?._id, (messages) => {
      setMessages(messages);
    });
    return () => {
      socket.off(globalData.currentRoom?._id);
    };
  }, [globalData.currentRoom, socket]);

  const handleSendMessage = () => {
    const body = {
      room_id: globalData.currentRoom?._id,
      information: message,
      typeMessage: "text",
      user_id: globalData.user?._id,
      disabled: false,
    };
    setMessages([...messages, body]);

    socket.emit("send_message", body);
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
            <View style={{ marginLeft: 20, marginTop: 6, width: 150 }}>
              <Text style={{ fontSize: 16, color: "#fff" }}>
                {recipientName}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
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
          </View>
        </ImageBackground>
        <ScrollView>
          {messages.map((item, index) => (
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent:
                  item.user_id === globalData.user._id
                    ? "flex-end"
                    : "flex-start",
              }}
            >
              <Text>{item.information}</Text>
            </View>
          ))}
        </ScrollView>
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
            value={message}
            onChangeText={(e) => handleMessageChange(e)}
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
              onPress={() => handleSendMessage()}
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
