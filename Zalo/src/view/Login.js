// Login.js
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";

export default function Login({ navigation, selectedLanguage }) {
  const [language, setLanguage] = useState(selectedLanguage || "vi");

  const data = {
    vi: [
      {
        image: require("../image/3.0.png"),
        text: "Gọi video ổn định",
        text1: "Trò chuyện thật đã với hình ảnh sắc nét, tiếng",
        text2: "chất, âm chuẩn dưới mọi điều kiện mạng",
      },
      {
        image: require("../image/3.2.png"),
        text: "Chat nhóm tiện lợi",
        text1: "Cũng trao đổi, giữ liên lạc với gia đình, bạn bè và",
        text2: "đồng nghiệp mọi lúc mọi nơi",
      },
      {
        image: require("../image/3.3.png"),
        text: "Gửi ảnh nhanh chóng",
        text1: "Chia sẻ hình ảnh chất lượng cao với bạn bè và",
        text2: "người thân nhanh chóng và dễ dàng",
      },
      {
        image: require("../image/3.1.png"),
        text: "Nhật ký bạn bè",
        text1: "Nơi cập nhật hoạt động mới nhất của những người",
        text2: "bạn quan tâm",
      },
    ],
    en: [
      {
        image: require("../image/3.0.png"),
        text: "Stable video calls",
        text1: "Real conversations with sharp images, high-quality",
        text2: "sound, and standard audio in all network conditions",
      },
      {
        image: require("../image/3.2.png"),
        text: "Convenient group chats",
        text1: "Communicate, keep in touch with family, friends, and",
        text2: "colleagues anytime, anywhere",
      },
      {
        image: require("../image/3.3.png"),
        text: "Send photos quickly",
        text1: "Share high-quality photos with friends and",
        text2: "family quickly and easily",
      },
      {
        image: require("../image/3.1.png"),
        text: "Friend's diary",
        text1: "Where to update the latest activities of those",
        text2: "you care about",
      },
    ],
  };

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const loginText = language === "vi" ? "Đăng nhập" : "Login";
  const registerText = language === "vi" ? "Đăng ký" : "Register";

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      {/* Phần tiêu đề */}
      <View>
        <Text
          style={{
            marginLeft: 150,
            marginTop: 80,
            fontSize: 50,
            fontWeight: "bold",
            color: "blue",
          }}
        >
          Zalo
        </Text>
      </View>

      {/* Phần hiển thị nội dung */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          {data[language].map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.text}>{item.text}</Text>
              <Text style={styles.text1}>{item.text1}</Text>
              <Text style={styles.text2}>{item.text2}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Phần nút đăng nhập và đăng ký */}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 20,
        }}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("ScreenLogin", { selectedLanguage: language });
          }}
          style={{
            width: 350,
            height: 50,
            backgroundColor: "#00BFFF",
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 70,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "white",
              fontWeight: 700,
            }}
          >
            {loginText}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("ScreenRegister", { selectedLanguage: language });
          }}
          style={{
            width: 350,
            height: 50,
            backgroundColor: "#DCDCDC",
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              fontWeight: 700,
            }}
          >
            {registerText}
          </Text>
        </Pressable>
      </View>

      {/* Phần chuyển đổi ngôn ngữ */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Pressable
          onPress={() => handleLanguageChange("vi")}
          style={{ marginRight: 20 }}
        >
          <Text
            style={{
              fontSize: 15,
              color: language === "vi" ? "blue" : "black",
            }}
          >
            Tiếng Việt
          </Text>
        </Pressable>
        <Pressable onPress={() => handleLanguageChange("en")}>
          <Text
            style={{
              fontSize: 15,
              color: language === "en" ? "blue" : "black",
            }}
          >
            English
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 15,
  },
  itemContainer: {
    alignItems: "center",
  },
  image: {
    width: 420,
    height: 300,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 10,
  },
  text1: {
    fontSize: 14,
    marginTop: 10,
    marginLeft: 10,
  },
  text2: {
    fontSize: 14,
    marginTop: 10,
    marginLeft: 10,
  },
});
