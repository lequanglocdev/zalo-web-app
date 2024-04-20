import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";

const ReadWord = ({ navigation }) => {
  const route = useRoute();
  const { url } = route.params;

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: `https://docs.google.com/gview?embedded=true&url=${url}`,
        }}
        style={styles.webview}
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    marginTop: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  backButtonText: {
    fontSize: 16,
    color: "#333",
  },
});

export default ReadWord;
