import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
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
import * as FilePicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { getRemainUserForSingleRoom } from "../utils/getRemainUserForSingleRoom";
import MessageItem from "../view/MessageItem";
import * as ImagePicker from "expo-image-picker"; // Import thư viện image picker

export default function SendMessager({ navigation, route }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showSendButton, setShowSendButton] = useState(false);
  const room = route.params?.room;
  const { globalData } = useContext(globalContext);
  const socket = io.connect(baseURLOrigin);
  const scrollViewRef = useRef();
  const textInputRef = useRef();

  const handleMessageChange = (text) => {
    setMessage(text);
    setShowSendButton(text !== ""); // Hiển thị nút gửi nếu có nội dung trong tin nhắn
  };

  useEffect(() => {
    api({
      method: typeHTTP.GET,
      url: `/message/get-by-room/${globalData.currentRoom?._id}`,
    }).then((messages) => {
      setMessages(messages);
      scrollToBottom(); // Scroll xuống khi vào giao diện
    });
  }, []);

  useEffect(() => {
    socket.on(globalData.currentRoom?._id, (messages) => {
      setMessages(messages);
    });
    return () => {
      socket.off(globalData.currentRoom?._id);
    };
  }, [globalData.currentRoom, socket]);

  useEffect(() => {
    scrollToBottom(); // Scroll xuống khi danh sách tin nhắn được cập nhật
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) {
      // Kiểm tra xem tin nhắn có trống không hoặc chỉ chứa khoảng trắng
      return; // Nếu trống, không làm gì cả
    }

    const body = {
      room_id: globalData.currentRoom?._id,
      information: message,
      typeMessage: "text",
      user_id: globalData.user?._id,
      disabled: false,
    };
    setMessages([...messages, body]);

    socket.emit("send_message", body);
    scrollToBottom(); // Cuộn xuống khi gửi tin nhắn mới
    setMessage(""); // Xóa nội dung trong ô nhập tin nhắn
    Keyboard.dismiss(); // Ẩn bàn phím

    setShowSendButton(false); // Ẩn nút gửi sau khi gửi tin nhắn
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, 100);
  };

  const pickFile = async () => {
    let result = await FilePicker.getDocumentAsync({
      // multiple: true,
      copyToCacheDirectory: true,
      // type: "image/*",
    });
    if (!result.canceled) {
      const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const body = {
        room_id: globalData.currentRoom._id,
        information: {
          base64,
          originalname: result.assets[0].name,
          uri: result.assets[0].uri,
          mimetype: result.assets[0].mimeType,
          size: result.assets[0].size,
        },
        typeMessage: "file",
        user_id: globalData.user._id,
        users: globalData.currentRoom?.users.map((item) => item._id),
      };
      setMessages([
        ...messages,
        {
          typeMessage: "loading",
          style: "flex-end",
        },
      ]);
      api({
        url: "/message/send-file-mobile",
        method: typeHTTP.POST,
        body: body,
      }).then((res) => {
        socket.emit("send_message_with_file", res);
      });
    }
  };

  const pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Thông báo",
        "Ứng dụng cần quyền truy cập vào thư viện ảnh để chọn ảnh!",
        [{ text: "OK", onPress: () => console.log("Permission denied") }]
      );
      return;
    }
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        // allowsMultipleSelection: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        base64: true,
      });
      if (!result.cancelled) {
        const body = {
          room_id: globalData.currentRoom._id,
          information: {
            base64: result.assets[0].base64,
            originalname: result.assets[0].fileName,
            uri: result.assets[0].uri,
            mimetype: result.assets[0].mimeType,
            size: result.assets[0].fileSize,
          },
          typeMessage: "image",
          user_id: globalData.user._id,
          users: globalData.currentRoom?.users.map((item) => item._id),
        };
        setMessages([
          ...messages,
          {
            typeMessage: "loading",
            style: "flex-end",
          },
        ]);
        api({
          url: "/message/send-file-mobile",
          method: typeHTTP.POST,
          body: body,
        }).then((res) => {
          socket.emit("send_message_with_file", res);
        });
      }
    } catch (error) {
      console.error("Error picking images:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" || "android" ? "padding" : null}
    >
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../image/Untitled.png")}
          style={{ width: 420, height: 110 }}
        >
          <View style={{ flexDirection: "row", marginTop: 60, marginLeft: 20 }}>
            <Pressable
              onPress={() => navigation.goBack("Message")}
              style={{ marginTop: 5 }}
            >
              <AntDesign name="arrowleft" size={24} color="#fff" />
            </Pressable>
            <View>
              <View style={{ marginLeft: 20, marginTop: 6, width: 150 }}>
                <Text style={{ fontSize: 16, color: "#fff" }}>
                  {room.type === "group"
                    ? room.name
                    : getRemainUserForSingleRoom(room, globalData.user?._id)
                        ?.username}
                </Text>
              </View>

              <View
                style={{ fontSize: "14px", color: "#7589A3", marginLeft: 20 }}
              >
                <Text style={{ fontSize: 16, color: "#fff" }}>
                  {globalData.currentRoom?.type === "group" &&
                    `${globalData.currentRoom?.users.length} thành viên`}
                </Text>
              </View>
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
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => scrollToBottom()}
        >
          {messages.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent:
                  item.user_id === globalData.user._id
                    ? "flex-end"
                    : "flex-start",
                marginVertical: 5,
                marginHorizontal: 10,
              }}
            >
              <View
                style={{
                  backgroundColor:
                    item.user_id === globalData.user._id ? "#B0E0E6" : "white",
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  maxWidth: 300,
                  alignItems: "center",
                  borderColor:
                    item.user_id === globalData.user._id
                      ? "#1E90FF"
                      : "#D3D3D3",
                  borderWidth: 2,
                }}
              >
                <MessageItem message={item} />
              </View>
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
          <TextInput
            ref={textInputRef}
            placeholder="Tin nhắn"
            value={message}
            onChangeText={(e) => handleMessageChange(e)}
            style={{
              flex: 1,
              fontSize: 18,
              color: "black",
              marginLeft: 10,
              marginTop: 13,
            }}
            placeholderTextColor="#808080"
          />
          {showSendButton && (
            <Pressable
              onPress={() => handleSendMessage()}
              style={{ marginTop: 10, marginRight: 10 }}
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
                alignItems: "center",
                marginTop: 10,
                marginRight: 10,
              }}
            >
              <Pressable onPress={() => pickFile()}>
                <MaterialCommunityIcons
                  name="dots-horizontal"
                  size={24}
                  color="#808080"
                />
              </Pressable>
              <Pressable style={{ marginLeft: 10 }}>
                <Feather name="mic" size={24} color="#808080" />
              </Pressable>
              <Pressable onPress={() => pickImage()} style={{ marginLeft: 10 }}>
                <AntDesign name="picture" size={24} color="#FFD700" />
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
