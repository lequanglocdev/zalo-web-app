import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { globalContext } from "../context/globalContext";
import { api, typeHTTP } from "../utils/api";

const ViewGroupMembers = ({ route, navigation }) => {
  const { roomId } = route.params;
  const { globalData, globalHandler } = useContext(globalContext);
  const [room, setRoom] = useState();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    setRoom(globalData.currentRoom);
    setParticipants(globalData.currentRoom.users);
  }, [globalData.currentRoom]);

  const handleSetDepute = (user_id) => {
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
    const body = {
      room_id: globalData.currentRoom._id,
      user_id,
    };
    api({ body, method: typeHTTP.POST, url: "/room/kick" }).then((res) => {
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
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <View>
      <Text>Thành viên trong nhóm</Text>
      <View style={{ flexDirection: "column", gap: 10, paddingHorizontal: 20 }}>
        {participants.map((user, index) => {
          return (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                key={index}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Image
                  source={{ uri: user.image }}
                  style={{ width: 60, height: 60, borderRadius: 90 }}
                />
                <Text>
                  {user.username}{" "}
                  {room?.creator === user._id && "(Nhóm Trưởng)"}
                </Text>
              </View>
              {user._id !== globalData.user._id && (
                <>
                  {room.depute.includes(user._id) ? (
                    <View>
                      <TouchableOpacity
                        onPress={() => handleRemoveDepute(user._id)}
                      >
                        <Text>XPP</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View>
                      <TouchableOpacity
                        onPress={() => handleSetDepute(user._id)}
                      >
                        <Text>PP</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  <TouchableOpacity onPress={() => handleKick(user._id)}>
                    <Text>X</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ViewGroupMembers;
