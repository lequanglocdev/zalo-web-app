import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
  Alert,
} from "react-native";
import { globalContext } from "../context/globalContext";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { getRemainUserForSingleRoom } from "../utils/getRemainUserForSingleRoom";
import { api, typeHTTP } from "../utils/api";
import Toast from "react-native-toast-message";

export default function InfoRoom({ navigation, route }) {
  const { globalData, globalHandler } = useContext(globalContext);
  const { room_id, room_type, room_image } = route.params;

  const handleDisBandRoom = () => {
    if (globalData.currentRoom.type === "group") {
      const id = globalData.currentRoom._id;
      api({ method: typeHTTP.DELETE, url: `/room/${id}` }).then((res) => {
        api({
          method: typeHTTP.GET,
          url: `/room/get-by-user/${globalData.user?._id}`,
        }).then((rooms) => {
          globalHandler.setRooms(rooms);
          navigation.navigate("Message");
        });
      });
    }
  };

  const handleUnFriend = (toUser) => {
    const body = {
      fromUser: globalData.user,
      toUser,
    };

    api({
      body: body,
      url: "/user/unfriend",
      method: typeHTTP.POST,
    })
      .then((res) => {
        console.log(res);
        Toast.show({
          type: "success",
          text1: "Đã xóa kết bạn thành công",
        });
        updateResultsAfterAction(toUser._id);
      })
      .catch((error) => {
        console.error("Lỗi khi xóa kết bạn:", error);
        Alert.alert(
          "Lỗi",
          "Đã xảy ra lỗi khi xóa kết bạn. Vui lòng thử lại sau"
        );
      });
  };

  const handleDisbandRoomWithConfirmation = () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn xóa nhóm không?",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Hủy bỏ xóa nhóm"),
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: handleDisBandRoom,
        },
      ],
      { cancelable: false }
    );
  };

  const room = globalData.rooms.find((room) => room._id === room_id);

  const getImageSource = () => {
    if (room_type === "group") {
      return room_image;
    } else {
      const remainUserRoom = getRemainUserForSingleRoom(
        room,
        globalData.user?._id
      );
      return remainUserRoom?.image || "";
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
                Tùy chọn
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <ScrollView>
        {room && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: -80,
            }}
          >
            <Image
              source={{ uri: getImageSource() }}
              style={{
                width: 90,
                height: 90,
                borderRadius: 90,
                marginTop: 100,
              }}
            />
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
                {room_type === "group"
                  ? room.name
                  : getRemainUserForSingleRoom(room, globalData.user?._id)
                      ?.username}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {room_type === "group" && (
          <Pressable
            onPress={() => {
              navigation.navigate("AddFriendGroup");
            }}
            style={{
              marginTop: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 90,
                marginTop: 20,
                backgroundColor: "#D3D3D3",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign name="addusergroup" size={24} color="black" />
            </View>
            <View style={{ width: 100 }}>
              <Text
                style={{ fontSize: 16, marginTop: 10, textAlign: "center" }}
              >
                Thêm thành viên
              </Text>
            </View>
          </Pressable>
        )}

        {room_type !== "group" && (
          <Pressable
            onPress={() => {
              globalHandler.setCurrentRoom(room);
              navigation.navigate("DataFriend", {
                room: room,
              });
            }}
            style={{
              marginTop: 20,
              alignItems: "center",
              justifyContent: "center",
              width: 100,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 90,
                marginTop: 20,
                backgroundColor: "#D3D3D3",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 20 }}>👤</Text>
            </View>
            <View>
              <Text
                style={{ fontSize: 16, marginTop: 10, textAlign: "center" }}
              >
                Trang cá nhân
              </Text>
            </View>
          </Pressable>
        )}

        <Pressable
          onPress={() => {
            navigation.navigate("ImageAndFileScreen", {
              roomId: room_id,
              roomType: room_type,
            });
          }}
          style={{
            width: 100,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 15,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 90,
              marginTop: 20,
              backgroundColor: "#D3D3D3",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AntDesign name="filetext1" size={24} color="black" />
          </View>
          <View>
            <Text style={{ fontSize: 16, marginTop: 10 }}>Ảnh và File</Text>
          </View>
        </Pressable>

        {room_type === "group" && (
          <Pressable
            onPress={() => {
              navigation.navigate("ViewGroupMembers", { roomId: room_id });
            }}
            style={{
              width: 100,
              marginTop: 20,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 15,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 90,
                marginTop: 20,
                backgroundColor: "#D3D3D3",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign name="user" size={24} color="black" />
            </View>

            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 16, marginTop: 10 }}>
                Xem thành viên nhóm
              </Text>
            </View>
          </Pressable>
        )}
      </View>

      {room_type === "group" && (
        <Pressable
          onPress={handleDisbandRoomWithConfirmation}
          style={{
            marginTop: 40,
            marginLeft: 15,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AntDesign name="delete" size={24} color="red" />
          <Text
            style={{
              fontSize: 16,
              marginLeft: 10,
              color: "red",
              fontWeight: "bold",
            }}
          >
            Xóa nhóm
          </Text>
        </Pressable>
      )}

      {room_type !== "group" && (
        <Pressable
          onPress={() =>
            handleUnFriend(
              getRemainUserForSingleRoom(room, globalData.user?._id)
            )
          }
          style={{
            marginTop: 20,
            marginLeft: 15,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AntDesign name="deleteuser" size={24} color="red" />
          <Text
            style={{
              fontSize: 16,
              marginLeft: 10,
              color: "red",
              fontWeight: "bold",
            }}
          >
            Xóa kết bạn
          </Text>
        </Pressable>
      )}
    </ScrollView>
  );
}
