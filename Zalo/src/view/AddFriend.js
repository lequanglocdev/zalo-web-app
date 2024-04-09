import {
  View,
  ScrollView,
  ImageBackground,
  Pressable,
  Image,
  Text,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalContext } from "../context/globalContext";
import { api, typeHTTP } from "../utils/api";

export default function AddFriend({ navigation, route }) {
  const [userData, setUserData] = useState({ username: "" });
  const [results, setResult] = useState([]);
  const { globalData, setGlobalData } = useContext(globalContext); // Thêm setGlobalData để cập nhật globalData

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
    }).then((res) => {
      console.log(res);
    });
  };

  const handleRefuse = (toUser) => {
    const body = {
      fromUser: globalData.user,
      toUser,
    };
    api({
      body: body,
      url: "/user/refuse-request",
      method: typeHTTP.POST,
    }).then((res) => {
      console.log(res);
    });
  };

  const handleAccept = (toUser) => {
    const body = {
      fromUser: globalData.user,
      toUser,
    };
    api({
      body: body,
      url: "/user/accept-request",
      method: typeHTTP.POST,
    }).then((res) => {
      console.log(res);
    });
  };

  const checkRelationship = (otherUser) => {
    console.log(otherUser.friends, globalData.user.friends);
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
        if (friend.status === "request") {
          return (
            <>
              <Pressable
                onPress={() => handleAccept(otherUser)}
                style={{
                  width: 100,
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
                  Chấp Nhận
                </Text>
              </Pressable>
              <Pressable
                onPress={() => handleRefuse(otherUser)}
                style={{
                  width: 100,
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
                  Từ Chối
                </Text>
              </Pressable>
            </>
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
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 400,
                }}
              >
                Ban bè
              </Text>
            </Pressable>
          );
        }
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
      {results.map((result, index) => (
        <View key={index} style={{ alignItems: "center" }}>
          <Text
            style={{
              marginTop: 10,
              fontSize: 20,
              fontWeight: 400,
            }}
          >
            {result.username}
          </Text>
        </View>
      ))}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
          flexDirection: "row",
        }}
      >
        {results.map((result, index) => (
          <View
            key={index}
            // onPress={() => {
            //   navigation.navigate("AddFriend2");
            // }}
            style={{
              width: 420,
              height: 150,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
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
            {/* <MaterialIcons name="person-add-alt" size={34} color="black" /> */}
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              {checkRelationship(result)}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
