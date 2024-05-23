import React, { useEffect, useState, useContext } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { globalContext } from "../context/globalContext";
import { api, typeHTTP } from "../utils/api";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"; // Import thư viện image picker

export default function CreateGroup({ navigation }) {
  const { globalData, globalHandler } = useContext(globalContext);
  const [result, setResult] = useState([]);
  const [phone, setPhone] = useState("");
  const [groupName, setGroupName] = useState("");
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

  const pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Thông báo",
        "Ứng dụng cần quyền truy cập vào thư viện ảnh để chọn ảnh!",
        [{ text: "OK", onPress: () => console.log("Permission denied") }]
      );
      return;
    }
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        base64: true,
      });
      if (!result.cancelled) {
        setImage({
          base64: result.assets[0].base64,
          originalname: result.assets[0].fileName,
          uri: result.assets[0].uri,
          mimetype: result.assets[0].mimeType,
          size: result.assets[0].fileSize,
        });
      }
    } catch (error) {
      console.error("Error picking images:", error);
    }
  };

  const handleCreateGroup = () => {
    console.log(image);
    if (image) {
      const body = {
        name: groupName,
        type: "group",
        users: participants.map((item) => item._id),
        image: image,
        creator: globalData.user._id,
      };
      api({
        url: "/room/create-group-mobile",
        method: typeHTTP.POST,
        body: body,
      }).then((res) => {
        Alert.alert("Thông báo", "Tạo nhóm thành công");
      });
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={{ backgroundColor: "#F2F2F2", justifyContent: "center" }}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 60,
            marginLeft: 20,
          }}
        >
          <Pressable onPress={() => handleRoom()}>
            <Feather name="x" size={24} color="black" />
          </Pressable>
          <View style={{ marginLeft: 20, marginTop: 2 }}>
            <Text style={{ fontSize: 18, fontWeight: 700 }}>Nhóm mới</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          borderWidth: 0.5,
          borderColor: "#C0C0C0",
        }}
      ></View>

      <View>
        <View>
          <Pressable
            onPress={pickImage}
            style={{
              marginLeft: 20,
              backgroundColor: "#00BFFF",
              width: 120,
              height: 40,
              borderRadius: 90,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>Chọn ảnh</Text>
          </Pressable>
          {image && (
            <Image
              source={{ uri: image.uri }}
              style={{ width: 200, height: 200, marginTop: 10 }}
            />
          )}

          <TextInput
            placeholder="Đặt tên nhóm"
            value={groupName}
            onChangeText={(text) => setGroupName(text)}
            style={{
              height: 50,
              paddingLeft: 10,
              fontSize: 16,
              borderColor: "black",
              marginLeft: 15,
            }}
          />
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
              source={{ uri: user?.image }}
              height={40}
              width={40}
              style={{ borderRadius: 20 }}
            />
            <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 15 }}>
              {user?.username}
            </Text>
          </View>
        ))}
        {participants.length >= 3 && groupName !== "" && image && (
          <Pressable
            onPress={() => handleCreateGroup()}
            style={{
              marginLeft: 20,
              backgroundColor: "#00BFFF",
              width: 120,
              height: 40,
              borderRadius: 90,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Tạo nhóm
            </Text>
          </Pressable>
        )}
      </View>
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
            backgroundColor: "#F2F2F2",
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
              source={{ uri: user?.image }} // Sử dụng ảnh của người dùng từ kết quả tìm kiếm
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
