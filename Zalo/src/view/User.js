import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TextInput,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globalContext } from "../context/globalContext";

export default function User({ navigation }) {
  const [userData, setUserData] = useState({ username: "" });
  const { globalData } = useContext(globalContext);
  const [image, setImage] = useState();

  useEffect(() => {
    setImage(globalData.user?.image ? globalData.user?.image : null);
  }, [globalData.user]);

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

  return (
    <ScrollView>
      <ImageBackground
        source={require("../image/Untitled.png")}
        style={{ width: 420, height: 100 }}
      >
        <View>
          <View style={{ flexDirection: "row", marginTop: 60 }}>
            <Image
              source={require("../image/material-symbols_search.png")}
              style={{ width: 30, height: 30, marginLeft: 20 }}
            ></Image>
            <View style={{ marginLeft: 20, marginTop: 2 }}>
              <TextInput
                placeholder="Tìm kiếm"
                style={{
                  width: 200,
                  fontSize: 18,
                  color: "white",
                  outlineStyle: "none",
                }}
                placeholderTextColor="white" // Đặt màu chữ của placeholder là trắng
              ></TextInput>
            </View>
            <Pressable
              onPress={() => {
                navigation.navigate("Setting");
              }}
              style={{ marginLeft: 100 }}
            >
              <SimpleLineIcons name="settings" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </ImageBackground>

      <View style={{ width: 420, height: 1000, backgroundColor: "#DCDCDC" }}>
        <View style={{ width: 420, height: 470, backgroundColor: "white" }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Pressable
              onPress={() => {
                navigation.navigate("DataUser");
              }}
              style={{ flexDirection: "row" }}
            >
              <Image
                source={
                  image ? { uri: image } : require("../image/ảnh nền.png")
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
                    marginTop: 10,
                    fontSize: 20,
                    marginLeft: 20,
                    fontWeight: 400,
                  }}
                >
                  {userData.username}
                </Text>
                <Text style={{ fontSize: 15, marginLeft: 20 }}>
                  Xem trang cá nhân
                </Text>
              </View>
            </Pressable>
            <View style={{ marginTop: 20, marginRight: 30 }}>
              <FontAwesome name="exchange" size={24} color="black" />
            </View>
          </View>
          <View
            style={{
              borderWidth: 3,
              borderColor: "#D3D3D3",
              width: 420,
              marginTop: 20,
            }}
          ></View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Ionicons name="wallet-outline" size={30} color="#1E90FF" />
            </View>
            <View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 20,
                  marginLeft: 20,
                  fontWeight: 400,
                }}
              >
                Ví QR
              </Text>
              <Text style={{ fontSize: 15, marginLeft: 20 }}>
                Lưu trữ và xuất trình các mã QR quan trọng
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Feather name="music" size={30} color="#1E90FF" />
            </View>
            <View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 20,
                  marginLeft: 20,
                  fontWeight: 400,
                }}
              >
                Nhạc chờ Zalo
              </Text>
              <Text style={{ fontSize: 15, marginLeft: 20 }}>
                Đăng ký học nhạc chờ, thể hiện cá tính
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <AntDesign name="cloudo" size={30} color="#1E90FF" />
            </View>
            <View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 20,
                  marginLeft: 20,
                  fontWeight: 400,
                }}
              >
                Cloud của tôi
              </Text>
              <Text style={{ fontSize: 15, marginLeft: 20 }}>
                201,9 MB / 1GB
              </Text>
            </View>
            <View style={{ marginLeft: 180, marginTop: 25 }}>
              <AntDesign name="right" size={20} color="black" />
            </View>
          </View>

          <View
            style={{
              borderWidth: 3,
              borderColor: "#D3D3D3",
              width: 420,
              marginTop: 20,
            }}
          ></View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Entypo name="time-slot" size={30} color="#1E90FF" />
            </View>
            <View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 20,
                  marginLeft: 20,
                  fontWeight: 400,
                }}
              >
                Dung lượng và dữ liệu
              </Text>
              <Text style={{ fontSize: 15, marginLeft: 20 }}>
                Quản lý dữ liệu Zalo của bạn
              </Text>
            </View>
            <View style={{ marginLeft: 100, marginTop: 25 }}>
              <AntDesign name="right" size={20} color="black" />
            </View>
          </View>

          <View
            style={{
              borderWidth: 3,
              borderColor: "#D3D3D3",
              width: 420,
              marginTop: 20,
            }}
          ></View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <MaterialCommunityIcons
                name="security"
                size={30}
                color="#1E90FF"
              />
            </View>
            <View>
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 20,
                  marginLeft: 20,
                  fontWeight: 400,
                }}
              >
                Tài khoản và bảo mật
              </Text>
            </View>
            <View style={{ marginLeft: 110, marginTop: 25 }}>
              <AntDesign name="right" size={20} color="black" />
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Ionicons name="lock-closed-outline" size={30} color="#1E90FF" />
            </View>
            <View>
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 20,
                  marginLeft: 20,
                  fontWeight: 400,
                }}
              >
                Quyền riêng tư
              </Text>
            </View>
            <View style={{ marginLeft: 165, marginTop: 25 }}>
              <AntDesign name="right" size={20} color="black" />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
