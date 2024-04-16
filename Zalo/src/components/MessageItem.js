import React from "react";
import { Image, Text, View } from "react-native";
import docx from "../../assets/docx.png";
import rar from "../../assets/rar.png";
import pdf from "../../assets/pdf.png";
export const fileTypes = {
  docx,
  rar,
  pdf,
};

const MessageItem = ({ message }) => {
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
        <Image
          style={{ width: 200, height: 100 }}
          source={{ uri: message.information?.url }}
        />
      );
    } else {
      const fileType = message.information.url
        .split("ap-southeast-1.amazonaws.com/")[1]
        .split("___")[0];
      return (
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Image
            source={fileTypes[fileType]}
            style={{ width: 50, height: 50 }}
          />
          <View style={{ flexDirection: "column", gap: 5 }}>
            <Text>{message.information.name}</Text>
            <Text>{message.information.size} MB</Text>
          </View>
        </View>
      );
    }
  }
};

export default MessageItem;
