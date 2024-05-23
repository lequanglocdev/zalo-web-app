import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Pressable,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalContext } from "../context/globalContext";
import { api, typeHTTP } from "../utils/api";
import Toast from "react-native-toast-message";

export default function InviteFriend({ navigation }) {
  const { globalData, globalHandler } = useContext(globalContext);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    api({
      url: `/user/friend-requests/${globalData.user?._id}`,
      method: typeHTTP.GET,
    }).then((res) => {
      console.log(res);
      setFriendRequests(res);
    });
  }, [globalData.user]);

  const handleRefuse = (toUser) => {
    api({
      url: `/user/find/${toUser.friendId}`,
      method: typeHTTP.GET,
    }).then((toUserResult) => {
      const body = {
        fromUser: globalData.user,
        toUser: toUserResult,
      };
      api({
        body: body,
        url: "/user/refuse-request",
        method: typeHTTP.POST,
      })
        .then((res) => {
          globalHandler.setUser(res);
        })
        .catch((error) => {
          console.error("Error refusing friend request:", error);
        });
    });
  };

  const handleAccept = (toUser) => {
    api({
      url: `/user/find/${toUser.friendId}`,
      method: typeHTTP.GET,
    }).then((toUserResult) => {
      const body = {
        fromUser: globalData.user,
        toUser: toUserResult,
      };
      api({
        body: body,
        url: "/user/accept-request",
        method: typeHTTP.POST,
      })
        .then((res) => {
          globalHandler.setUser(res);
          // console.log(res);
          // if (res.status === 200) {
          //   Toast.show({
          //     type: "success",
          //     text1: "Chấp nhận lời mời kết bạn thành công",
          //   });
          //   // Update local state or global context if needed
          //   updateResultsAfterAction(toUser._id);
          // } else {
          //   Toast.show({
          //     type: "error",
          //     text1: "Có lỗi xảy ra khi chấp nhận lời mời kết bạn",
          //   });
          // }
        })
        .catch((error) => {
          console.error("Error accepting friend request:", error);
          Toast.show({
            type: "error",
            text1: "Có lỗi xảy ra khi chấp nhận lời mời kết bạn",
          });
        });
    });
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require("../image/Untitled.png")}
        style={{ width: 420, height: 100 }}
      >
        <View>
          <View style={{ flexDirection: "row", marginTop: 60, marginLeft: 20 }}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
            </Pressable>
            <View style={{ marginLeft: 20, marginTop: 2 }}>
              <Text style={{ fontSize: 18, color: "white" }}>
                Lời mời kết bạn
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <View>
        {friendRequests && friendRequests.length > 0 ? (
          friendRequests.map((request, index) => (
            <View key={index}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: 20,
                  marginLeft: -150,
                }}
              >
                <Image
                  source={{ uri: request?.image }}
                  style={{ height: 50, width: 50, borderRadius: 90 }}
                />

                <Text style={{ fontSize: 20, marginLeft: 20 }}>
                  {request?.username}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  justifyContent: "center",
                  marginLeft: 80,
                }}
              >
                <Pressable
                  onPress={() => handleAccept(request)}
                  style={{
                    width: 140,
                    height: 45,
                    backgroundColor: "#87CEFA",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 90,
                  }}
                >
                  <Text style={{ fontSize: 18, color: "#0000FF" }}>
                    Chấp nhận
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => handleRefuse(request)}
                  style={{
                    width: 140,
                    height: 45,
                    backgroundColor: "#DCDCDC",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 90,
                    marginLeft: 20,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>Từ chối</Text>
                </Pressable>
              </View>
            </View>
          ))
        ) : (
          <View
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Text style={{ color: "#b2bec3", margin: 20 }}>
              Bạn không có lời mời kết bạn nào.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
