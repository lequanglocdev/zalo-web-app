import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import docx from "../../assets/docx.png";
import rar from "../../assets/rar.png";
import pdf from "../../assets/pdf.png";
import pptx from "../../assets/ppt.png"; // Import icon for PowerPoint file
import VideoPlayer from "./VideoPlayer";
import AudioPlayer from "./AudioPlayer";

export const fileTypes = {
  docx,
  rar,
  pdf,
  pptx, // Add PowerPoint icon to fileTypes object
};

const MessageItem = ({ message, onDelete }) => {
  // Passed onDelete as a prop
  const navigation = useNavigation();
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);

  // Function to handle delete message
  const handleDelete = () => {
    if (onDelete) {
      onDelete(message._id); // Call onDelete function with message id
    }
  };

  if (message.typeMessage === "text")
    return (
      <View>
        <Text>{message.information}</Text>
        {showDeleteMenu && (
          <Pressable onPress={handleDelete}>
            <View
              style={{
                marginLeft: -50,
                marginTop: -20,
              }}
            >
              <AntDesign name="sync" size={24} color="red" />
            </View>
            <Text
              style={{
                fontSize: 14,
                marginTop: 10,
                marginLeft: -70,
                fontWeight: "bold",
              }}
            >
              Thu Hồi
            </Text>
          </Pressable>
        )}

        <Pressable onPress={() => setShowDeleteMenu(!showDeleteMenu)}>
          <View
            style={{
              marginLeft: -50,
              marginTop: 15,
            }}
          >
            <AntDesign name="ellipsis1" size={24} color="black" />
          </View>
        </Pressable>
      </View>
    );
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
    if (message.information?.url?.includes("/image___")) {
      return (
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
          {showDeleteMenu && (
            <Pressable onPress={handleDelete}>
              <View
                style={{
                  marginLeft: -50,
                  marginTop: -20,
                }}
              >
                <AntDesign name="sync" size={24} color="red" />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 10,
                  marginLeft: -70,
                  fontWeight: "bold",
                }}
              >
                Thu Hồi
              </Text>
            </Pressable>
          )}
          <Pressable onPress={() => setShowDeleteMenu(!showDeleteMenu)}>
            <View
              style={{
                marginLeft: -50,
                marginTop: 15,
              }}
            >
              <AntDesign name="ellipsis1" size={24} color="black" />
            </View>
          </Pressable>
        </View>
      );
    } else if (message.information?.url?.includes("/video___")) {
      return (
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
          {showDeleteMenu && (
            <Pressable onPress={handleDelete}>
              <View
                style={{
                  marginLeft: -50,
                  marginTop: -20,
                }}
              >
                <AntDesign name="sync" size={24} color="red" />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 10,
                  marginLeft: -70,
                  fontWeight: "bold",
                }}
              >
                Thu Hồi
              </Text>
            </Pressable>
          )}

          <Pressable onPress={() => setShowDeleteMenu(!showDeleteMenu)}>
            <View
              style={{
                marginLeft: -50,
                marginTop: 15,
              }}
            >
              <AntDesign name="ellipsis1" size={24} color="black" />
            </View>
          </Pressable>
        </View>
      );
    } else if (message.information?.url?.includes("/audio___")) {
      return (
        <View>
          <Pressable>
            <AudioPlayer url={message.information?.url} />
          </Pressable>
          {showDeleteMenu && (
            <Pressable onPress={handleDelete}>
              <View
                style={{
                  marginLeft: -50,
                  marginTop: -20,
                }}
              >
                <AntDesign name="sync" size={24} color="red" />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 10,
                  marginLeft: -70,
                  fontWeight: "bold",
                }}
              >
                Thu Hồi
              </Text>
            </Pressable>
          )}

          <Pressable onPress={() => setShowDeleteMenu(!showDeleteMenu)}>
            <View
              style={{
                marginLeft: -50,
                marginTop: 15,
              }}
            >
              <AntDesign name="ellipsis1" size={24} color="black" />
            </View>
          </Pressable>
        </View>
      );
    } else {
      const fileType = message.information.url
        .split("ap-southeast-1.amazonaws.com/")[1]
        .split("___")[0];
      return (
        <View>
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
                <Text>{message.information?.name}</Text>
              </View>
              <Text>{message.information?.size} MB</Text>
            </View>
          </Pressable>
          {showDeleteMenu && (
            <Pressable onPress={handleDelete}>
              <View
                style={{
                  marginLeft: -50,
                  marginTop: -20,
                }}
              >
                <AntDesign name="sync" size={24} color="red" />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 10,
                  marginLeft: -70,
                  fontWeight: "bold",
                }}
              >
                Thu Hồi
              </Text>
            </Pressable>
          )}

          <Pressable onPress={() => setShowDeleteMenu(!showDeleteMenu)}>
            <View
              style={{
                marginLeft: -50,
                marginTop: 15,
              }}
            >
              <AntDesign name="ellipsis1" size={24} color="black" />
            </View>
          </Pressable>
        </View>
      );
    }
  }
};

export default MessageItem;
