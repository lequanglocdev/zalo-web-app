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

  const updateResultsAfterAction = (userId) => {
    const updatedResults = results.filter((user) => user._id !== userId);
    setResult(updatedResults);
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
    })
      .then((res) => {
        console.log(res);
        Toast.show({
          type: "success",
          text1: "Từ chối lời mời kết bạn thành công",
        });
        updateResultsAfterAction(toUser._id);
      })
      .catch((error) => {
        console.error("Error refusing friend request:", error);
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
    })
      .then((res) => {
        console.log(res);
        Toast.show({
          type: "success",
          text1: "Chấp nhận lời mời kết bạn thành công",
        });
        // const updatedUser = { ...globalData.user };
        // updatedUser.friends.push({ friendId: toUser._id, status: "friend" });
        // const updatedGlobalData = { ...globalData, user: updatedUser };
        // globalHandler.setUser(updatedGlobalData);
        updateResultsAfterAction(toUser._id);
      })
      .catch((error) => {
        console.error("Error accepting friend request:", error);
      });
  };

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
            />
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
                flexDirection: "row",
              }}
            >
              {checkRelationship(result)}
            </View>
          </View>
        ))}
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ScrollView>
  );
}
