import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function DataUser({ navigation }) {
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
        ></Image>
        <View>
          <Text
            style={{
              marginTop: 20,
              fontSize: 20,
              marginLeft: 20,
              fontWeight: 400,
            }}
          >
            {userData.username}
          </Text>
        </View>
      </View>

      <View style={{ marginLeft: 20, marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Thông Tin Cá Nhân
        </Text>
      </View>

      <View style={{ width: 380, justifyContent: "space-between" }}>
        <View style={{ marginLeft: 20, marginTop: 20, flexDirection: "row" }}>
          <Text style={{ fontSize: 15 }}>Giới tính</Text>
          <Text style={{ fontSize: 15, marginLeft: 100 }}>Nam</Text>
        </View>

        <View
          style={{
            width: 350,
            borderWidth: 0.5,
            borderColor: "#D3D3D3",
            marginTop: 15,
            marginLeft: 20,
          }}
        ></View>

        <View style={{ marginLeft: 20, marginTop: 20, flexDirection: "row" }}>
          <Text style={{ fontSize: 15 }}>Ngày sinh</Text>
          <Text style={{ fontSize: 15, marginLeft: 90 }}>24/03/2002</Text>
        </View>

        <View
          style={{
            width: 350,
            borderWidth: 0.5,
            borderColor: "#D3D3D3",
            marginTop: 15,
            marginLeft: 20,
          }}
        ></View>

        <View style={{ marginLeft: 20, marginTop: 20, flexDirection: "row" }}>
          <Text style={{ fontSize: 15 }}>Điện thoại</Text>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 15, marginLeft: 90 }}>
              +84 396 356 806
            </Text>
            <View style={{ width: 230, marginLeft: 90 }}>
              <Text style={{ fontSize: 12, color: "#A9A9A9" }}>
                Số điện thoại chỉ hiển thị với người có lưu số bạn trong danh bạ
                máy
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Pressable
          style={{
            width: 370,
            height: 55,
            backgroundColor: "#D3D3D3",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 90,
            flexDirection: "row",
          }}
        >
          <SimpleLineIcons name="pencil" size={24} color="black" />
          <Text style={{ marginLeft: 15 }}>Chỉnh sửa</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
