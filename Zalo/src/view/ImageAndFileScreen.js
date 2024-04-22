import { View, Text, ImageBackground, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function ImageAndFileScreen({ navigation }) {
  return (
    <View>
      <ImageBackground
        source={require("../image/Untitled.png")}
        style={{ width: 420, height: 100 }}
      >
        <View>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={{ marginLeft: 20, marginTop: 60 }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}
