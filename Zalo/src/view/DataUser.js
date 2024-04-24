import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { globalContext } from "../context/globalContext"; // Import the global context

export default function DataUser({ navigation }) {
  const { globalData } = useContext(globalContext);
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.getMonth().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

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
          source={
            globalData.user?.image
              ? { uri: globalData.user?.image }
              : require("../image/ảnh nền.png")
          }
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
            {globalData.user.username}
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
          <Text style={{ fontSize: 15, marginLeft: 100 }}>
            {globalData.user.gender}
          </Text>
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
          <Text style={{ fontSize: 15 }}>Ngày sinh </Text>
          <Text style={{ fontSize: 15, marginLeft: 90 }}>
            {formatDate(new Date(globalData.user.birthday))}
          </Text>
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
              +84 {globalData.user.phone}
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
          onPress={() => {
            navigation.navigate("Dateofbirth");
          }}
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
