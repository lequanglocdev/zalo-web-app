import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Friend({ navigation, route }) {
  const [showCountryList, setShowCountryList] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const toggleCountryList = () => {
    setShowCountryList(!showCountryList);
  };

  const selectCountry = (country) => {
    setSelectedCountry(country);
    setShowCountryList(false);
  };

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
  };

  useEffect(() => {
    if (route.params && route.params.selectedCountry) {
      setSelectedCountry(route.params.selectedCountry);
    }
  }, [route.params]);

  return (
    <ScrollView>
      <View>
        <View style={{ flexDirection: "row", marginTop: 60, marginLeft: 20 }}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </Pressable>
          <View style={{ marginLeft: 20, marginTop: 2 }}>
            <Text style={{ fontSize: 18, fontWeight: 700 }}>Thêm bạn</Text>
          </View>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: "#DCDCDC",
            width: 420,
            marginTop: 20,
          }}
        ></View>

        <View style={{ alignItems: "center", marginTop: 20 }}>
          <View
            style={{
              width: 250,
              height: 250,
              backgroundColor: "#00008B",
              borderRadius: 20,
            }}
          >
            <View style={{ alignItems: "center", marginTop: 15 }}>
              <Text style={{ color: "white", fontSize: 18, fontWeight: 500 }}>
                Lê Quang Lộc
              </Text>
            </View>

            <View style={{ alignItems: "center", marginTop: 15 }}>
              <View
                style={{
                  width: 150,
                  height: 150,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AntDesign name="qrcode" size={150} color="black" />
              </View>
            </View>

            <View style={{ alignItems: "center", marginTop: 15 }}>
              <Text style={{ color: "#808080", fontSize: 14 }}>
                Quét mã để thêm bạn Zalo với tôi
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 350, backgroundColor: "white", marginTop: 20 }}>
          <Pressable
            onPress={() => {
              navigation.navigate("CountryListScreen");
            }}
            style={{
              width: 200,
              height: 50,
              borderColor: "black",
              borderWidth: 1,
              marginLeft: 15,
              marginTop: 15,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            {/* Phần bên trái để hiển thị quốc gia đã chọn hoặc "Chọn quốc gia" nếu chưa chọn */}
            <Text>
              {selectedCountry ? selectedCountry.name : "Chọn quốc gia"}
            </Text>

            {/* Phần bên phải để hiển thị biểu tượng mở rộng danh sách */}
            <Text>▼</Text>
          </Pressable>

          {showCountryList && (
            <ScrollView style={{ maxHeight: 200 }}>
              {countriesData.map((country, index) => (
                <Pressable
                  key={index}
                  onPress={() => selectCountry(country)}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#CCCCCC",
                  }}
                >
                  <Text>{country.name}</Text>
                </Pressable>
              ))}
            </ScrollView>
          )}

          {/* Phần bên phải để nhập số điện thoại */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              paddingHorizontal: 15,
            }}
          >
            <Text style={{ marginRight: 10 }}>
              {selectedCountry ? selectedCountry.dialCode : ""}
            </Text>
            <View style={{ width: 250 }}>
              <TextInput
                placeholder="Nhập số điện thoại"
                style={{
                  height: 50,
                  paddingLeft: 10,
                  fontSize: 16,
                  borderColor: "black",
                  borderWidth: 1,
                }}
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
              />
            </View>

            <Pressable
              onPress={() => {
                navigation.navigate("AddFriend");
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 90,
                backgroundColor: "#A9A9A9",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 20,
              }}
            >
              <AntDesign name="arrowright" size={24} color="black" />
            </Pressable>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: "#DCDCDC",
              width: 400,
              marginTop: 15,
              marginLeft: 15,
            }}
          ></View>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={{ marginLeft: 15 }}>
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={24}
                color="blue"
              />
            </View>

            <Text style={{ fontSize: 18, marginLeft: 15 }}>Quét mã QR</Text>
          </View>

          <View
            style={{
              borderWidth: 3,
              borderColor: "#DCDCDC",
              width: 420,
              marginTop: 20,
            }}
          ></View>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={{ marginLeft: 15 }}>
              <AntDesign name="contacts" size={24} color="blue" />
            </View>
            <Text style={{ fontSize: 18, marginLeft: 15 }}>Danh bạ máy</Text>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: "#DCDCDC",
              width: 360,
              marginTop: 15,
              marginLeft: 55,
            }}
          ></View>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={{ marginLeft: 15 }}>
              <FontAwesome5 name="user-friends" size={24} color="blue" />
            </View>

            <Text style={{ fontSize: 18, marginLeft: 15 }}>
              Bạn bè có thể quen
            </Text>
          </View>
        </View>

        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ fontSize: 15 }}>
            Xem lời mời kết bạn đã gửi tại trang Danh bạ Zalo
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
