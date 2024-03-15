import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

export default function Message({ navigation }) {
  var [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://654ad3515b38a59f28ee4286.mockapi.io/project")
      .then((response) => response.json())
      .then((json) => {
        console.log(data);
        setData(json);
      });
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
                placeholder="Tìm Kiếm"
                style={{
                  width: 200,
                  fontSize: 18,
                  color: "white",
                  outlineStyle: "none",
                }}
                placeholderTextColor="white" // Đặt màu chữ của placeholder là trắng
              ></TextInput>
            </View>
            <View style={{ marginLeft: 60 }}>
              <MaterialIcons name="qr-code-scanner" size={24} color="white" />
            </View>
            <View style={{ marginLeft: 20 }}>
              <FontAwesome6 name="add" size={24} color="white" />
            </View>
          </View>
        </View>
      </ImageBackground>

      <Pressable>
        {data.map((item, index) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate("SendMessager");
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <View>
                <Image
                  src={item.image}
                  style={{
                    width: 50,
                    height: 50,
                    marginLeft: 20,
                    borderRadius: 90,
                  }}
                ></Image>
              </View>

              <View
                style={{
                  width: 300,
                  height: 60,
                  marginLeft: 20,
                  marginTop: 10,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 20, fontWeight: 400 }}>
                  {item.description}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </Pressable>
    </ScrollView>
  );
}
