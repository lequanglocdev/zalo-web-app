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

export default function DetailMedia({ navigation }) {
  const route = useRoute();
  const { url } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image
          style={styles.image}
          source={{ uri: url }}
          resizeMode="contain"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 60,
    marginLeft: 20,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
