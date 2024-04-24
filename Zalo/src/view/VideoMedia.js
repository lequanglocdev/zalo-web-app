import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import VideoPlayer from "./VideoPlayer";

export default function VideoMedia({ navigation }) {
  const route = useRoute();
  const { url } = route.params;
  return (
    <View style={{ with: "100%", height: "100%", position: "relative" }}>
      <VideoPlayer style={{ with: "100%", height: "100%" }} url={url} />
      <Pressable
        style={{ position: "absolute", top: 40, left: 10, zIndex: 10 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-outline" size={30} color="black" />
      </Pressable>
    </View>
  );
}
