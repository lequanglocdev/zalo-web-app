import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Pressable,
  Modal,
  StyleSheet,
  Image,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { globalContext } from "../context/globalContext";
import { api, typeHTTP } from "../utils/api";

export default function Avatar({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { globalData, globalHandler } = useContext(globalContext);
  const [image, setImage] = useState();

  useEffect(() => {
    setImage(globalData.user?.image ? globalData.user?.image : null);
  }, [globalData.user]);

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
        // allowsMultipleSelection: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
      });
      if (!result.cancelled) {
        const body = {
          avatar: {
            base64: result.assets[0].base64,
            originalname: result.assets[0].fileName,
            uri: result.assets[0].uri,
            mimetype: result.assets[0].mimeType,
            size: result.assets[0].fileSize,
          },
        };
        api({
          url: `/user/update-avatar-mobile/${globalData.user?._id}`,
          method: typeHTTP.PUT,
          body: body,
        }).then((res) => {
          setModalVisible(false);
          globalHandler.setUser(res);
        });
      }
    } catch (error) {
      console.error("Error picking images:", error);
    }
  };

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
              <Text style={{ fontSize: 18, color: "white" }}>Ảnh Đại Diện</Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <View
        style={{
          backgroundColor: "#DCDCDC",
          height: 40,
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 16, marginLeft: 10 }}>
          Cập nhật ảnh đẹp nhất
        </Text>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 150,
        }}
      >
        <View
          style={{
            width: 150,
            height: 150,
            backgroundColor: "#DCDCDC",
            borderRadius: 90,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 150, height: 150, borderRadius: 150 }}
            />
          ) : (
            <Entypo name="user" size={100} color="white" />
          )}
        </View>
      </View>

      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 15, color: "#808080", textAlign: "center" }}>
          Bạn có thể chỉnh sửa ảnh với nhiều tùy chọn và bộ lọc màu thú vị
        </Text>
      </View>

      <Pressable
        style={{ alignItems: "center", marginTop: 20 }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ fontSize: 15, color: "#00BFFF" }}>Chọn ảnh ngay</Text>
      </Pressable>

      <View style={{ alignItems: "center" }}>
        <Pressable
          onPress={() => {
            navigation.navigate("DataUser");
          }}
          style={{
            marginTop: 180,
            width: 250,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 90,
            backgroundColor: "#116CF5",
          }}
        >
          <Text style={{ fontSize: 18, color: "white" }}>Tiếp tục</Text>
        </Pressable>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Tùy chọn chọn ảnh từ thư viện */}
            <Pressable onPress={() => pickImage()}>
              <Text style={styles.modalOption}>Chọn ảnh từ thư viện</Text>
            </Pressable>
            {/* Tùy chọn chụp ảnh từ camera */}
            <Pressable onPress={() => console.log("Chụp ảnh từ camera")}>
              <Text style={styles.modalOption}>Chụp ảnh từ camera</Text>
            </Pressable>
            {/* Tùy chọn hủy */}
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={[styles.modalOption, { color: "red" }]}>Hủy</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalOption: {
    height: 70,
    fontSize: 20,
    textAlign: "center",
    color: "#00BFFF",
    marginTop: 20,
  },
});
