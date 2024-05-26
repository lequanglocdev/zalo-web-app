import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  Alert,
  FlatList,
  ImageBackground,
} from "react-native";
import { globalContext } from "../context/globalContext";
import { api, typeHTTP } from "../utils/api";
import { Ionicons } from "@expo/vector-icons";

export default function AddFriendGroup({ navigation }) {
  const { globalData, globalHandler } = useContext(globalContext);
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState([]);

  const [participants, setParticipants] = useState(
    globalData.currentRoom.users || []
  );

  const handleRender = () => {
    api({
      method: typeHTTP.GET,
      url: `/room/get-by-user/${globalData.user?._id}`,
    }).then((rooms) => {
      globalHandler.setRooms(rooms);
      navigation.navigate("Message");
    });
  };

  const handleSearch = () => {
    if (phone.length < 9 || phone.length > 10) {
      Alert.alert(
        "Thông báo",
        "Số điện thoại không hợp lệ, số phải có độ dài từ 9 đến 10 chữ số.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      return;
    }

    setResult([]);
    api({ url: "/user/find", method: typeHTTP.GET }).then((res) => {
      const friends = res.filter((item) => item.phone.includes(phone));
      if (friends.length === 0) {
        Alert.alert(
          "Thông báo",
          "Số điện thoại không có trong danh sách bạn bè.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      } else {
        setResult(friends);
      }
    });
  };

  const handleAdd = (user_id) => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn thêm thành viên này vào nhóm?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Thêm",
          onPress: () => {
            const body = {
              room_id: globalData.currentRoom._id,
              user_id,
            };
            api({ body, method: typeHTTP.POST, url: "/room/add" }).then(
              (res) => {
                try {
                  globalHandler.setCurrentRoom({
                    ...globalData.currentRoom,
                    users: res.users,
                  });
                  Alert.alert(
                    "Thành công",
                    "Thành viên đã được thêm vào nhóm."
                  );
                } catch (error) {
                  console.log(error);
                }
              }
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderUser = ({ item }) => (
    <View
      key={item._id}
      style={{
        flexDirection: "row",
        marginLeft: 15,
        marginTop: 20,
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: item.image }} // Use user's image from search result
        style={{ width: 40, height: 40, borderRadius: 20 }}
      />
      <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 15 }}>
        {item.username}
      </Text>
      {participants.map((participant) => participant._id).includes(item._id) ? (
        <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 15 }}>
          Đã trong nhóm
        </Text>
      ) : (
        <Pressable onPress={() => handleAdd(item._id)}>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 15 }}>
            +
          </Text>
        </Pressable>
      )}
    </View>
  );

  return (
    <View>
      <ImageBackground
        source={require("../image/Untitled.png")}
        style={{ width: 420, height: 100 }}
      >
        <View>
          <View style={{ flexDirection: "row", marginTop: 60 }}>
            <Pressable
              onPress={() => {
                handleRender();
              }}
              style={{ marginLeft: 20 }}
            >
              <Ionicons name="arrow-back-outline" size={24} color="white" />
            </Pressable>
            <View style={{ marginLeft: 20, marginTop: 2 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
              >
                Thêm Thành Viên
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

      <View style={{ marginLeft: 15, marginTop: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Người dùng tìm thấy
        </Text>
        <FlatList
          data={result}
          keyExtractor={(item) => item._id}
          renderItem={renderUser}
          ListEmptyComponent={() => (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Không tìm thấy bạn bè
            </Text>
          )}
        />
      </View>
    </View>
  );
}
