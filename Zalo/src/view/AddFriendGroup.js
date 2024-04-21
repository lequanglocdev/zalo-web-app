import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import { globalContext } from "../context/globalContext";
import { Ionicons } from "@expo/vector-icons";
import { api, typeHTTP } from "../utils/api";

export default function AddFriendGroup({ navigation }) {
  const { globalData, globalHandler } = useContext(globalContext);
  const [result, setResult] = useState([]);
  const [phone, setPhone] = useState("");
  const [participants, setParticipants] = useState([]);
  const [image, setImage] = useState(null);

  const handleRoom = () => {
    api({
      method: typeHTTP.GET,
      url: `/room/get-by-user/${globalData.user?._id}`,
    }).then((rooms) => {
      globalHandler.setRooms(rooms);
      navigation.navigate("Message");
    });
  };

  useEffect(() => setParticipants([globalData.user]), [globalData.user]);

  const handleSearch = () => {
    // Kiểm tra độ dài của số điện thoại
    if (phone.length < 9 || phone.length > 10) {
      Alert.alert(
        "Thông báo",
        "Số điện thoại không có trong danh sách bạn bè, số phải có độ dài từ 9 đến 10 chữ số.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      return;
    }

    setResult([]);
    api({ url: "/user/find", method: typeHTTP.GET }).then((res) => {
      const arr = res.filter((item) =>
        item.phone.includes(phone.toLowerCase())
      );
      setResult(arr);
    });
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
                Thêm vào nhóm
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <TextInput
          placeholder="Tìm số điện thoại"
          style={{
            width: 300,
            height: 50,
            paddingLeft: 10,
            fontSize: 16,
            borderColor: "black",
            marginLeft: 15,
            backgroundColor: "#D3D3D3",
            borderRadius: 90,
          }}
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <Pressable
          onPress={handleSearch}
          style={{
            backgroundColor: "#00BFFF",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 15,
            width: 80,
            borderRadius: 90,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
            Tìm kiếm
          </Text>
        </Pressable>
      </View>

      {participants.map((user, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 15,
            marginTop: 20,
          }}
        >
          <Image
            source={{
              uri: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
            }}
            height={40}
            width={40}
            style={{ borderRadius: 20 }}
          />
          <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 15 }}>
            {user?.username}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 15 }}>
            Đã trong nhóm
          </Text>
        </View>
      ))}

      <View style={{ marginLeft: 15, marginTop: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Người dùng tìm thấy
        </Text>
        {result.map((user, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              marginLeft: 15,
              marginTop: 20,
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
              }}
              height={40}
              width={40}
              style={{ borderRadius: 20 }}
            />
            <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 15 }}>
              {user?.username}
            </Text>
            {participants.map((item) => item._id).includes(user._id) ? (
              <Text
                style={{ fontSize: 16, fontWeight: "bold", marginLeft: 15 }}
              >
                Đã trong nhóm
              </Text>
            ) : (
              // Kiểm tra xem người dùng đã có trong nhóm chưa, nếu chưa thì hiển thị dấu cộng
              <Pressable
                onPress={() => setParticipants([...participants, user])}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", marginLeft: 15 }}
                >
                  +
                </Text>
              </Pressable>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
