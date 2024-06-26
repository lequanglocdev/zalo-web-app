import React, { useEffect, useState, useContext } from "react";
import {
  View,
  ScrollView,
  ImageBackground,
  Pressable,
  Image,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalContext } from "../context/globalContext";
import { api, typeHTTP } from "../utils/api";
import Toast from "react-native-toast-message";

export default function AddFriend({ navigation, route }) {
  const [userData, setUserData] = useState({ username: "" });
  const [results, setResult] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const { globalData, globalHandler } = useContext(globalContext);

  const handleAddFriend = () => {
    api({
      method: typeHTTP.GET,
      url: `/room/get-by-user/${globalData.user?._id}`,
    }).then((rooms) => {
      globalHandler.setRooms(rooms);
      navigation.navigate("Message");
    });
  };

  useEffect(() => {
    if (route.params && route.params.results) {
      setResult(route.params.results);
    }
  }, [route.params]);

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

  const handleSendRequestAddFriend = (toUser) => {
    const body = {
      fromUser: globalData.user,
      toUser,
    };
    api({
      body: body,
      url: "/user/send-request-add-friend",
      method: typeHTTP.POST,
    })
      .then((res) => {
        console.log(res);
        setSentRequests([...sentRequests, toUser._id]);
      })
      .catch((error) => {
        console.error("Error sending friend request:", error);
      });
  };

  const checkRelationship = (otherUser) => {
    if (sentRequests.includes(otherUser._id)) {
      return (
        <Pressable>
          <Text>Đã gửi lời mời kết bạn</Text>
        </Pressable>
      );
    } else {
      if (
        globalData.user?.friends
          .map((item) => item.friendId)
          .includes(otherUser._id)
      ) {
        const friend = globalData.user.friends.filter(
          (item) => item.friendId === otherUser._id
        )[0];
        if (friend.status === "pending") {
          return (
            <Pressable>
              <Text>Đã gửi lời mời kết bạn</Text>
            </Pressable>
          );
        } else {
          return (
            <Pressable
              style={{
                width: 100,
                height: 55,
                backgroundColor: "#00BFFF",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 90,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 400,
                }}
              >
                Bạn bè
              </Text>
            </Pressable>
          );
        }
      } else {
        return (
          <Pressable
            onPress={() => handleSendRequestAddFriend(otherUser)}
            style={{
              width: 200,
              height: 55,
              backgroundColor: "#00BFFF",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 90,
              marginLeft: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 400,
              }}
            >
              Gửi lời mời kết bạn
            </Text>
          </Pressable>
        );
      }
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <ImageBackground
        source={require("../image/nhung-hinh-anh-phong-canh-dep-nhat-hinh-35.png")}
        style={{ width: 420, height: 300 }}
      >
        <View style={{ flexDirection: "row" }}>
          <Pressable
            onPress={() => {
              handleAddFriend();
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

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        {results.map((result, index) => (
          <View
            key={index}
            style={{
              width: 420,
              height: 100,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
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
                  source={
                    result.image
                      ? { uri: result.image }
                      : require("../image/ảnh nền.png")
                  }
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 90,
                  }}
                />
              </View>
              <Text style={{ fontSize: 20, marginTop: 20 }}>
                {result.username}
              </Text>
              <View style={{ marginTop: 10 }}>{checkRelationship(result)}</View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
