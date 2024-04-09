import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddFriend2({ navigation }) {
  const [userData, setUserData] = useState({ username: "" });
  const [text, setText] = useState(
    "Xin Chào, mình là Lê Quang Minh. Mình biết bạn qua số điện thoại."
  );
  const [showClearButton, setShowClearButton] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const jsonValue = await AsyncStorage.getItem("userData");
        if (jsonValue != null) {
          setUserData(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error("Error reading user data from AsyncStorage:", e);
      }
    }

    fetchUserData();
  }, []);

  const handleTextChange = (inputText) => {
    if (inputText.length <= 150) {
      // Kiểm tra input có nhiều hơn 150 ký tự không
      setText(inputText);
      setShowClearButton(inputText.length > 0); // Hiển thị thanh "X" nếu có nội dung
    }
  };

  const clearText = () => {
    setText("");
    setShowClearButton(false);
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require("../image/Untitled.png")}
        style={{ width: 420, height: 100 }}
      >
        <View style={{ flexDirection: "row" }}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={{ marginLeft: 20, marginTop: 60 }}
          >
            <Feather name="x" size={24} color="white" />
          </Pressable>

          <View style={{ marginLeft: 20, marginTop: 60 }}>
            <Text style={{ fontSize: 18, color: "white", fontWeight: 600 }}>
              Kết bạn
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View style={{ backgroundColor: "white" }}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../image/hinhcanhan.png")}
            style={{
              width: 50,
              height: 50,
              marginTop: 10,
              marginLeft: 20,
              borderRadius: 90,
            }}
          />
          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                marginTop: 10,
                fontSize: 20,
                marginLeft: 20,
                fontWeight: 400,
              }}
            >
              {userData.username}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: 380,
            borderWidth: 0.5,
            borderColor: "#D3D3D3",
            marginTop: 15,
            marginLeft: 20,
          }}
        />

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <View style={{ alignItems: "center" }}>
            <TextInput
              placeholder={"Nhập lời mới kết bạn"}
              value={text}
              onChangeText={handleTextChange}
              multiline={true}
              maxLength={150} // Giới hạn số ký tự
              style={{
                width: 320,
                height: 50,
                fontSize: 15,
                color: "black",
                marginLeft: 20,
              }}
            />
          </View>
          {showClearButton && (
            <Pressable onPress={clearText} style={{ marginLeft: 30 }}>
              <Feather name="x" size={24} color="#BABABA" />
            </Pressable>
          )}
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={{
              fontSize: 15,
              color: "#808080",
              marginTop: 5,
              marginRight: 10,
            }}
          >
            {text.length}/150
          </Text>
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
          flexDirection: "row",
        }}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("AddFriend");
          }}
          style={{
            width: 300,
            height: 55,
            backgroundColor: "#1E90FF",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 90,
            flexDirection: "row",
          }}
        >
          <Text style={{ marginLeft: 15, color: "white", fontWeight: 700 }}>
            Gửi yêu cầu
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
