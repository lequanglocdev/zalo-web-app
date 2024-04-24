import React from "react";
import { Image, Pressable, Text, View, AudioPlayer } from "react-native";
import { useNavigation } from "@react-navigation/native";
import docx from "../../assets/docx.png";
import rar from "../../assets/rar.png";
import pdf from "../../assets/pdf.png";
import pptx from "../../assets/ppt.png"; // Import icon for PowerPoint file
import VideoPlayer from "./VideoPlayer";
export const fileTypes = {
  docx,
  rar,
  pdf,
  pptx, // Add PowerPoint icon to fileTypes object
};

const MessageItem = ({ message }) => {
  const navigation = useNavigation();
  if (message.typeMessage === "text") return <Text>{message.information}</Text>;
  else if (message.typeMessage === "loading") {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: message.style,
          width: "100%",
        }}
      >
        <Text>Loading</Text>
      </View>
    );
  } else {
    if (message.information.url.includes("/image___")) {
      return (
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
      );
    } else if (message.information.url.includes("/video___")) {
      return (
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
      );
    } else if (message.information.url.includes("/audio___")) {
      return (
        <TouchableOpacity onLongPress={() => handleTouchHover()}>
          <AudioPlayer url={message.information.url} />
        </TouchableOpacity>
      );
    } else {
      const fileType = message.information.url
        .split("ap-southeast-1.amazonaws.com/")[1]
        .split("___")[0];
      return (
        <Pressable
          onPress={() => {
            navigation.navigate("ReadWord", {
              url: message.information?.url,
            });
          }}
          style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
        >
          <Image
            source={fileTypes[fileType]}
            style={{ width: 50, height: 50 }}
          />
          <View style={{ flexDirection: "column", gap: 5 }}>
            <View style={{ width: 200 }}>
              <Text>{message.information.name}</Text>
            </View>
            <Text>{message.information.size} MB</Text>
          </View>
        </Pressable>
      );
    }
  }
};

export default MessageItem;
