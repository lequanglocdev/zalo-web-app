import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  Modal,
  Alert,
} from "react-native";
import { globalContext } from "../context/globalContext";
import { api, typeHTTP } from "../utils/api";
import { Ionicons } from "@expo/vector-icons";

const ViewGroupMembers = ({ navigation }) => {
  const handleRender = () => {
    api({
      method: typeHTTP.GET,
      url: `/room/get-by-user/${globalData.user?._id}`,
    }).then((rooms) => {
      globalHandler.setRooms(rooms);
      navigation.navigate("Message");
    });
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { globalData, globalHandler } = useContext(globalContext);
  const [room, setRoom] = useState();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    setRoom(globalData.currentRoom);
    setParticipants(globalData.currentRoom.users);
  }, [globalData.currentRoom]);

  useEffect(() => {
    // Mở modal nếu có người được chọn
    if (selectedUserId) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [selectedUserId]);

  const handlePressMember = (userId) => {
    if (userId !== globalData.user._id) {
      setSelectedUserId(userId);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedUserId(null);
  };

  const handleSetDepute = (user_id) => {
    Alert.alert(
      "Bạn muốn bổ nhiệm người này làm phó nhóm?",
      "Người này có thể duyệt thành viên và thay đổi các cài đặt của nhóm",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Bổ nhiệm",
          onPress: () => {
            const body = {
              room_id: globalData.currentRoom._id,
              user_id,
            };
            api({ body, method: typeHTTP.POST, url: "/room/add-depute" }).then(
              (res) => {
                globalHandler.setCurrentRoom({
                  ...globalData.currentRoom,
                  depute: res.depute,
                });
              }
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleRemoveDepute = (user_id) => {
    const body = {
      room_id: globalData.currentRoom._id,
      user_id,
    };
    api({ body, method: typeHTTP.POST, url: "/room/remove-depute" }).then(
      (res) => {
        globalHandler.setCurrentRoom({
          ...globalData.currentRoom,
          depute: res.depute,
        });
      }
    );
  };

  const handleKick = (user_id) => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn xóa thành viên này khỏi nhóm?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: () => {
            const body = {
              room_id: globalData.currentRoom._id,
              user_id,
            };
            api({ body, method: typeHTTP.POST, url: "/room/kick" }).then(
              (res) => {
                try {
                  if (res.users.length === 1) {
                    globalHandler.setRooms(
                      globalData.rooms.filter((item) => item._id !== res._id)
                    );
                    navigation.navigate("Message");
                  } else {
                    globalHandler.setCurrentRoom({
                      ...globalData.currentRoom,
                      users: globalData.currentRoom.users.filter((item) =>
                        res.users.includes(item._id)
                      ),
                    });
                    closeModal();
                  }
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

  return (
    <View style={{ flex: 1 }}>
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
                Thành Viên
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <View style={{ marginLeft: 20, marginTop: 20 }}>
        <Text style={{ color: "#00BFFF", fontSize: 18, fontWeight: "bold" }}>
          Thành Viên ({participants.length})
        </Text>
      </View>

      <View
        style={{
          flexDirection: "column",
          gap: 20,
          paddingHorizontal: 20,
          marginTop: 20,
        }}
      >
        {participants.map((user, index) => {
          const isCreator = room?.creator === user._id;
          const isDepute = room?.depute.includes(user._id);
          return (
            <View
              key={user._id}
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => handlePressMember(user._id)}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Image
                    source={{ uri: user?.image }}
                    style={{ width: 60, height: 60, borderRadius: 90 }}
                  />
                  <View
                    style={{
                      flexDirection: "column",
                      marginLeft: 20,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {user?.username}
                    </Text>
                    <Text
                      style={{ marginTop: 5, color: "#808080", fontSize: 15 }}
                    >
                      {isCreator && "(Nhóm Trưởng)"}
                      {isDepute && "(Phó Nhóm)"}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "flex-end", // Align to the bottom
            backgroundColor: "rgba(0, 0, 0, 0.2)", // Slightly darken background
          }}
          activeOpacity={1}
        >
          <View
            style={{
              width: "100%", // Full width
              padding: 20,
              backgroundColor: "white",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              alignItems: "center",
              height: 250,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginLeft: 110 }}
              >
                Thông tin thành viên
              </Text>

              <TouchableOpacity
                onPress={closeModal}
                style={{ marginLeft: 60, marginTop: -5 }}
              >
                <Ionicons name="close-outline" size={32} color="black" />
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: 412,
                borderWidth: 0.5,
                borderColor: "#D3D3D3",
                marginTop: 15,
              }}
            ></View>

            <View style={{ flexDirection: "row", marginLeft: -140 }}>
              <Image
                source={{
                  uri: participants.find((user) => user._id === selectedUserId)
                    ?.image,
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  marginTop: 10,
                }}
              />

              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                  marginLeft: 20,
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                  {
                    participants.find((user) => user._id === selectedUserId)
                      ?.username
                  }
                </Text>
              </View>
            </View>

            {room && room.creator === globalData.user._id && (
              <>
                {room.depute.includes(selectedUserId) ? (
                  <View style={{ marginTop: 20, marginLeft: -190 }}>
                    <TouchableOpacity
                      onPress={() => {
                        handleRemoveDepute(selectedUserId);
                      }}
                    >
                      <Text>Xóa bổ nhiệm làm phó nhóm</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ marginTop: 20, marginLeft: -220 }}>
                    <TouchableOpacity
                      onPress={() => {
                        handleSetDepute(selectedUserId);
                      }}
                    >
                      <Text>Bổ nhiệm làm phó nhóm</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )}

            {room &&
              (room.creator === globalData.user._id ||
                room.depute.includes(globalData.user._id)) && (
                <TouchableOpacity
                  onPress={() => {
                    handleKick(selectedUserId);
                  }}
                  style={{ marginTop: 20, marginLeft: -272 }}
                >
                  <Text style={{ fontSize: 15, color: "red" }}>
                    {room.creator !== selectedUserId ? "Xóa khỏi nhóm" : ""}
                  </Text>
                </TouchableOpacity>
              )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ViewGroupMembers;
