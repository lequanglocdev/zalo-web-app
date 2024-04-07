import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Pressable,
  Modal,
  StyleSheet,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";

export default function Avatar({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

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
          <Entypo name="user" size={100} color="white" />
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
            navigation.navigate("Message");
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
            <Pressable onPress={() => console.log("Chọn ảnh từ thư viện")}>
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
