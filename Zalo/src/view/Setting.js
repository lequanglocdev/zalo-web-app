import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

export default function Setting({ navigation }) {
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
              <Text style={{ fontSize: 18, color: "white" }}>Cài đặt</Text>
            </View>
            <Image
              source={require("../image/material-symbols_search.png")}
              style={{ width: 30, height: 30, marginLeft: 250 }}
            ></Image>
          </View>
        </View>
      </ImageBackground>

      <View style={{ width: 420, height: 1000, backgroundColor: "#DCDCDC" }}>
        <View style={{ width: 420, height: 1000, backgroundColor: "white" }}>
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
              <AntDesign name="right" size={18} color="black" />
            </View>
          </View>

          <View
            style={{
              borderWidth: 0.3,
              borderColor: "#DCDCDC",
              width: 330,
              marginTop: 20,
              marginLeft: 70,
            }}
          ></View>

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
              <AntDesign name="right" size={18} color="black" />
            </View>
          </View>

          <View
            style={{
              borderWidth: 3,
              borderColor: "#F9FAFB",
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
              <AntDesign name="right" size={18} color="black" />
            </View>
          </View>

          <View
            style={{
              borderWidth: 0.3,
              borderColor: "#DCDCDC",
              width: 330,
              marginTop: 20,
              marginLeft: 70,
            }}
          ></View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Fontisto name="cloud-refresh" size={30} color="#1E90FF" />
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
                Sao lưu và khôi phục
              </Text>
              <Text style={{ fontSize: 15, marginLeft: 20 }}>
                Bảo vệ tin nhắn khi đổi máy hoặc cài lại Zalo
              </Text>
            </View>
            <View style={{ marginLeft: 100, marginTop: 25 }}>
              <AntDesign name="right" size={18} color="black" />
            </View>
          </View>

          <View
            style={{
              borderWidth: 3,
              borderColor: "#F9FAFB",
              width: 420,
              marginTop: 20,
            }}
          ></View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Ionicons
                name="notifications-outline"
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
                Thông báo
              </Text>
            </View>
            <View style={{ marginLeft: 200, marginTop: 25 }}>
              <AntDesign name="right" size={18} color="black" />
            </View>
          </View>

          <View
            style={{
              borderWidth: 0.3,
              borderColor: "#DCDCDC",
              width: 330,
              marginTop: 20,
              marginLeft: 70,
            }}
          ></View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <MaterialIcons name="message" size={30} color="#1E90FF" />
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
                Tin nhắn
              </Text>
            </View>
            <View style={{ marginLeft: 220, marginTop: 25 }}>
              <AntDesign name="right" size={18} color="black" />
            </View>
          </View>

          <View
            style={{
              borderWidth: 0.5,
              borderColor: "#DCDCDC",
              width: 330,
              marginTop: 20,
              marginLeft: 70,
            }}
          ></View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <MaterialIcons name="call" size={30} color="#1E90FF" />
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
                Cuộc gọi
              </Text>
            </View>
            <View style={{ marginLeft: 218, marginTop: 25 }}>
              <AntDesign name="right" size={18} color="black" />
            </View>
          </View>

          <View
            style={{
              borderWidth: 0.5,
              borderColor: "#DCDCDC",
              width: 330,
              marginTop: 20,
              marginLeft: 70,
            }}
          ></View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <MaterialIcons name="access-time" size={30} color="#1E90FF" />
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
                Nhật ký
              </Text>
            </View>
            <View style={{ marginLeft: 228, marginTop: 25 }}>
              <AntDesign name="right" size={18} color="black" />
            </View>
          </View>

          <View
            style={{
              borderWidth: 0.5,
              borderColor: "#DCDCDC",
              width: 330,
              marginTop: 20,
              marginLeft: 70,
            }}
          ></View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <AntDesign name="contacts" size={30} color="#1E90FF" />
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
                Danh bạ
              </Text>
            </View>
            <View style={{ marginLeft: 223, marginTop: 25 }}>
              <AntDesign name="right" size={18} color="black" />
            </View>
          </View>

          <View
            style={{
              borderWidth: 0.5,
              borderColor: "#DCDCDC",
              width: 330,
              marginTop: 20,
              marginLeft: 70,
            }}
          ></View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Octicons name="paintbrush" size={24} color="#1E90FF" />
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
                Giao diện và ngôn ngữ
              </Text>
            </View>
            <View style={{ marginLeft: 105, marginTop: 25 }}>
              <AntDesign name="right" size={18} color="black" />
            </View>
          </View>

          <View
            style={{
              borderWidth: 3,
              borderColor: "#F9FAFB",
              width: 420,
              marginTop: 20,
            }}
          ></View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Ionicons
                name="information-circle-outline"
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
                Thông tin về Zalo
              </Text>
            </View>
            <View style={{ marginLeft: 143, marginTop: 25 }}>
              <AntDesign name="right" size={18} color="black" />
            </View>
          </View>

          <View
            style={{
              borderWidth: 0.5,
              borderColor: "#DCDCDC",
              width: 330,
              marginTop: 20,
              marginLeft: 70,
            }}
          ></View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <MaterialIcons name="support-agent" size={30} color="#1E90FF" />
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
                Liên hệ hỗ trợ
              </Text>
            </View>
            <View style={{ marginLeft: 175, marginTop: 25 }}>
              <AntDesign name="message1" size={18} color="black" />
            </View>
          </View>

          <View
            style={{
              borderWidth: 3,
              borderColor: "#F9FAFB",
              width: 420,
              marginTop: 20,
            }}
          ></View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <MaterialIcons name="manage-accounts" size={30} color="#1E90FF" />
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
                Chuyển tài khoản
              </Text>
            </View>
            <View style={{ marginLeft: 142, marginTop: 25 }}>
              <AntDesign name="right" size={18} color="black" />
            </View>
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pressable
              onPress={() => {
                navigation.navigate("ScreenLogin");
              }}
              style={{
                width: 350,
                height: 50,
                backgroundColor: "#D3D3D3",
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                flexDirection: "row",
              }}
            >
              <View>
                <Ionicons name="log-out-outline" size={24} color="black" />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  fontWeight: 700,
                  marginLeft: 10,
                }}
              >
                Đăng xuất
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
