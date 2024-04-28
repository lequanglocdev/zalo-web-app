import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import docx from "../../assets/docx.png";
import rar from "../../assets/rar.png";
import pdf from "../../assets/pdf.png";
import pptx from "../../assets/ppt.png";
import VideoPlayer from "./VideoPlayer";
import AudioPlayer from "./AudioPlayer";

export const fileTypes = {
  docx,
  rar,
  pdf,
  pptx,
};

const MessageItem = ({ message, onDelete }) => {
  const navigation = useNavigation();

  // Function to handle delete message
  const handleDelete = () => {
    if (onDelete) {
      onDelete(message._id); // Call onDelete function with message id
    }
  };

  // Trong phần render của component MessageItem:
  return (
    <Pressable onPress={() => {}}>
      <View>
        {message.typeMessage === "text" ? (
          <Text>{message.information}</Text>
        ) : message.typeMessage === "loading" ? (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: message.style,
                width: "100%",
              }}
            >
              <Text>Loading</Text>
            </View>
          </View>
        ) : message.typeMessage === "image" ? (
          <View>
            <Pressable
              onPress={() => {
                navigation.navigate("DetailMedia", {
                  url: message.information?.url,
                });
              }}
            >
              <Image
                style={{ width: 200, height: 100 }}
                source={{ uri: message.information?.url }}
              />
            </Pressable>
          </View>
        ) : message.typeMessage === "video" ? (
          <View>
            <Pressable
              onPress={() =>
                navigation.navigate("VideoMedia", {
                  url: message.information?.url,
                })
              }
              style={{ position: "relative" }}
            >
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: 1,
                }}
              ></View>
              <VideoPlayer
                url={message.information.url}
                style={{ width: 300, height: 300 }}
              />
            </Pressable>
          </View>
        ) : message.typeMessage === "audio" ? (
          <View>
            <Pressable onPress={() => handleTouchHover()}>
              <AudioPlayer url={message.information?.url} />
            </Pressable>
          </View>
        ) : (
          <View>
            <Pressable
              onPress={() => {
                navigation.navigate("ReadWord", {
                  url: message.information?.url,
                });
              }}
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Image
                source={
                  fileTypes[
                    message.information?.url
                      .split("ap-southeast-1.amazonaws.com/")[1]
                      .split("___")[0]
                  ]
                }
                style={{ width: 50, height: 50 }}
              />
              <View style={{ flexDirection: "column", gap: 5 }}>
                <View style={{ width: 200 }}>
                  <Text>{message.information?.name}</Text>
                </View>
                <Text>{message.information?.size} MB</Text>
              </View>
            </Pressable>
          </View>
        )}
        <Pressable onPress={handleDelete}>
          <AntDesign name="delete" size={24} color="red" />
        </Pressable>
      </View>
    </Pressable>
  );
};

export default MessageItem;
