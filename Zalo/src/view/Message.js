import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
  TextInput,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function Message({ navigation }) {
  var [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    fetch("https://654ad3515b38a59f28ee4286.mockapi.io/project")
      .then((response) => response.json())
      .then((json) => {
        console.log(data);
        setData(json);
      });
  }, []);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

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
            <Pressable style={{ marginLeft: 20 }} onPress={toggleModal}>
              <FontAwesome6 name="add" size={24} color="white" />
            </Pressable>
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

      <Modal visible={isModalVisible} transparent={true} animationType="none">
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Pressable style={{ flexDirection: "row" }}>
                  <View style={{ marginLeft: 10 }}>
                    <AntDesign name="adduser" size={25} color="#A9A9A9" />
                  </View>
                  <Pressable
                    onPress={() => {
                      navigation.navigate("Friend");
                      toggleModal();
                    }}
                  >
                    <View style={{ marginLeft: 10, marginTop: 2 }}>
                      <Text style={{ fontSize: 20, fontWeight: 400 }}>
                        Thêm bạn
                      </Text>
                    </View>
                  </Pressable>
                </Pressable>

                <Pressable style={{ flexDirection: "row", marginTop: 25 }}>
                  <View style={{ marginLeft: 10 }}>
                    <AntDesign name="addusergroup" size={25} color="#A9A9A9" />
                  </View>
                  <View style={{ marginLeft: 10, marginTop: 2 }}>
                    <Text style={{ fontSize: 20, fontWeight: 400 }}>
                      Tạo nhóm
                    </Text>
                  </View>
                </Pressable>

                <Pressable style={{ flexDirection: "row", marginTop: 25 }}>
                  <View style={{ marginLeft: 10 }}>
                    <AntDesign name="cloudo" size={25} color="#A9A9A9" />
                  </View>
                  <View style={{ marginLeft: 10, marginTop: 2 }}>
                    <Text style={{ fontSize: 20, fontWeight: 400 }}>
                      Cloud của tôi
                    </Text>
                  </View>
                </Pressable>

                <Pressable style={{ flexDirection: "row", marginTop: 25 }}>
                  <View style={{ marginLeft: 12 }}>
                    <FontAwesome name="calendar" size={25} color="#A9A9A9" />
                  </View>
                  <View style={{ marginLeft: 12, marginTop: 2 }}>
                    <Text style={{ fontSize: 20, fontWeight: 400 }}>
                      Lịch Zalo
                    </Text>
                  </View>
                </Pressable>

                <Pressable style={{ flexDirection: "row", marginTop: 25 }}>
                  <View style={{ marginLeft: 10 }}>
                    <Feather name="video" size={25} color="#A9A9A9" />
                  </View>
                  <View style={{ marginLeft: 10, marginTop: 2 }}>
                    <Text style={{ fontSize: 20, fontWeight: 400 }}>
                      Tạo cuộc gọi nhóm
                    </Text>
                  </View>
                </Pressable>

                <Pressable style={{ flexDirection: "row", marginTop: 25 }}>
                  <View style={{ marginLeft: 10 }}>
                    <FontAwesome name="laptop" size={25} color="#A9A9A9" />
                  </View>
                  <View style={{ marginLeft: 10, marginTop: 2 }}>
                    <Text style={{ fontSize: 20, fontWeight: 400 }}>
                      Thiết bị đăng nhập
                    </Text>
                  </View>
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    // alignItems: "flex-end",
    // justifyContent: "flex-start",
    marginTop: 60,
    marginLeft: 160,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 250,
    height: 320,
  },
});
