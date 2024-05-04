import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { globalContext } from "../context/globalContext";
import { getRemainUserForSingleRoom } from "../utils/getRemainUserForSingleRoom";

export default function DataFriend({ navigation, route }) {
  const { globalData, globalHandler } = useContext(globalContext);
  const { room_id, room_type, room_image } = route.params;
  const room = route.params?.room;
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.getMonth().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getImageSource = () => {
    if (room_type === "group") {
      return room_image;
    } else {
      const remainUserRoom = getRemainUserForSingleRoom(
        room,
        globalData.user?._id
      );
      return remainUserRoom?.image || ""; // Trả về ảnh của người dùng hoặc chuỗi rỗng nếu không có ảnh
    }
  };
  return (
    <ScrollView>
      <ImageBackground
        source={require("../image/Untitled.png")}
        style={{ width: 420, height: 100 }}
      >
        <View>
          <View style={{ flexDirection: "row", marginTop: 60 }}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
              style={{ marginLeft: 20 }}
            >
              <Ionicons name="arrow-back-outline" size={24} color="white" />
            </Pressable>
            <View style={{ marginLeft: 20, marginTop: 2 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
              >
                Trang Cá Nhân
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <ScrollView>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: getImageSource() }}
            style={{
              width: 90,
              height: 90,
              borderRadius: 90,
              marginTop: 20,
            }}
          />
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
              {room.type === "group"
                ? room.name
                : getRemainUserForSingleRoom(room, globalData.user?._id)
                    ?.username}
            </Text>
          </View>
        </View>

        <View style={{ marginLeft: 20, marginTop: 20, flexDirection: "row" }}>
          <Text style={{ fontSize: 15 }}>Giới tính</Text>
          <Text style={{ fontSize: 15, marginLeft: 100 }}>
            {room.type === "group"
              ? room.name
              : getRemainUserForSingleRoom(room, globalData.user?._id)?.gender}
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
            {formatDate(
              new Date(
                room.type === "group"
                  ? room.name
                  : getRemainUserForSingleRoom(room, globalData.user?._id)
                      ?.birthday
              )
            )}
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
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 15, marginLeft: 90 }}>+84</Text>

              <Text style={{ fontSize: 15, marginLeft: 10 }}>
                {room.type === "group"
                  ? room.name
                  : getRemainUserForSingleRoom(room, globalData.user?._id)
                      ?.phone}
              </Text>
            </View>
            <View style={{ width: 230, marginLeft: 90 }}>
              <Text style={{ fontSize: 12, color: "#A9A9A9" }}>
                Số điện thoại chỉ hiển thị với người có lưu số bạn trong danh bạ
                máy
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
}
