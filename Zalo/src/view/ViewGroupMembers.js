import React, { useContext } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { globalContext } from "../context/globalContext";

const ViewGroupMembers = ({ route }) => {
  const { roomId } = route.params;
  const { globalData } = useContext(globalContext);

  // Tìm phòng theo roomId
  const room = globalData.rooms.find((room) => room._id === roomId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thành viên trong nhóm</Text>
      <FlatList
        data={room.members}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.memberContainer}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={styles.username}>{item.username}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  memberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
  },
});

export default ViewGroupMembers;
