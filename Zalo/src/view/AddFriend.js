import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddFriend({ navigation }) {
  const [userData, setUserData] = useState({ username: "" });

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

  return (
    <ScrollView>
      <ImageBackground
        source={require("../image/nhung-hinh-anh-phong-canh-dep-nhat-hinh-35.png")}
        style={{ width: 420, height: 300 }}
      >
        <View style={{ flexDirection: "row" }}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={{ marginLeft: 20, marginTop: 60 }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>

          <View style={{ marginLeft: 320, marginTop: 60 }}>
            <Ionicons name="call-outline" size={24} color="white" />
          </View>
        </View>
      </ImageBackground>

      <View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: -50,
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: "#DCDCDC",
              borderRadius: 90,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../image/hinhcanhan.png")}
              style={{
                width: 100,
                height: 100,
                borderRadius: 90,
              }}
            ></Image>
          </View>
        </View>
      </View>

      <View style={{ alignItems: "center" }}>
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
            navigation.navigate("SendMessager");
          }}
          style={{
            width: 300,
            height: 55,
            backgroundColor: "#87CEFA",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 90,
            flexDirection: "row",
          }}
        >
          <AntDesign name="message1" size={24} color="blue" />
          <Text style={{ marginLeft: 15, color: "blue", fontWeight: 700 }}>
            Nhắn tin
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate("AddFriend2");
          }}
          style={{
            width: 70,
            height: 55,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 90,
            flexDirection: "row",
            marginLeft: 10,
          }}
        >
          <MaterialIcons name="person-add-alt" size={34} color="black" />
        </Pressable>
      </View>
    </ScrollView>
  );
}
