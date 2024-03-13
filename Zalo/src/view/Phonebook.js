import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function Phonebook() {
  const [activeForm, setActiveForm] = useState("friend");
  const [activeForm1, setActiveForm1] = useState("all");
  // Thêm state mới để lưu trữ kí tự hiện tại được chọn
  const [selectedChar, setSelectedChar] = useState(null);
  const [showCharBar, setShowCharBar] = useState(true); // Thêm state mới

  // Mảng chứa các kí tự từ A đến Z
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode("A".charCodeAt(0) + i)
  );
  // Hàm xử lý khi người dùng chọn một kí tự
  const handleCharPress = (char) => {
    setSelectedChar(char);
  };

  // Hàm xử lý khi người dùng chọn một tab
  const handlePress = (form) => {
    setActiveForm(form);
    setActiveForm1(form);

    // Ẩn thanh chữ cái khi chọn tab "Mới truy cập"
    if (form === "recent") {
      setShowCharBar(false);
    } else {
      setShowCharBar(true);
    }
  };

  // Hàm hiển thị nội dung tương ứng với tab được chọn
  const renderForm = () => {
    // If activeForm is null, default to "friend"
    const formToShow = activeForm || "friend";
    const formToShow1 = activeForm1 || "all";

    return (
      <View style={{ position: "relative" }}>
        {(formToShow === "friend" ||
          formToShow1 === "all" ||
          formToShow1 === "recent") && (
          <View>
            {/* Hiển thị nội dung của tab "Bạn bè" và "Tất cả" */}
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 37,
                  height: 39,
                  borderRadius: 10,
                  backgroundColor: "#2D4ADF",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 20,
                  marginTop: 20,
                }}
              >
                <FontAwesome5 name="user-friends" size={24} color="white" />
              </View>
              <View>
                <Text
                  style={{
                    marginLeft: 20,
                    marginTop: 20,
                    fontSize: 20,
                    fontWeight: 400,
                  }}
                >
                  Lời mời kết bạn
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 37,
                  height: 39,
                  borderRadius: 10,
                  backgroundColor: "#2D4ADF",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 20,
                  marginTop: 30,
                }}
              >
                <AntDesign name="contacts" size={24} color="white" />
              </View>
              <View>
                <Text
                  style={{
                    marginTop: 25,
                    marginLeft: 20,
                    fontSize: 20,
                    fontWeight: 400,
                  }}
                >
                  Danh bạ máy
                </Text>
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 15,
                  }}
                >
                  Liên hệ có dùng Zalo
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 37,
                  height: 39,
                  borderRadius: 10,
                  backgroundColor: "#2D4ADF",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 20,
                  marginTop: 30,
                }}
              >
                <FontAwesome name="birthday-cake" size={24} color="white" />
              </View>
              <View>
                <Text
                  style={{
                    marginTop: 25,
                    marginLeft: 20,
                    fontSize: 20,
                    fontWeight: 400,
                  }}
                >
                  Lịch sinh nhật
                </Text>
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 15,
                  }}
                >
                  Theo dõi sinh nhật của bạn bè
                </Text>
              </View>
            </View>

            <View
              style={{
                borderWidth: 3,
                borderColor: "#C6C4C4",
                width: 420,
                marginTop: 20,
              }}
            ></View>
            <View style={{ flexDirection: "row" }}>
              {/* Tab "Tất cả" */}
              <View
                style={[
                  styles.tab2,
                  activeForm1 === "all" && styles.activeTabText,
                ]}
              >
                <Pressable
                  onPress={() => handlePress("all")}
                  style={[
                    styles.tab1,
                    activeForm1 === "all" && styles.activeTabText,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeForm1 === "all" && styles.activeTabText,
                    ]}
                  >
                    Tất cả
                  </Text>
                </Pressable>
              </View>

              {/* Tab "Mới truy cập" */}
              <View
                style={[
                  styles.tab2,
                  activeForm1 === "recent" && styles.activeTabText,
                ]}
              >
                <Pressable
                  onPress={() => handlePress("recent")}
                  style={[styles.tab1, activeForm1 === "recent"]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeForm1 === "recent" && styles.activeTabText,
                    ]}
                  >
                    Mới truy cập
                  </Text>
                </Pressable>
              </View>
            </View>
            {showCharBar && (
              <View style={styles.sidePanel}>
                {alphabet.map((char) => (
                  <Pressable
                    key={char}
                    onPress={() => handleCharPress(char)}
                    style={[
                      styles.charButton,
                      selectedChar === char && styles.selectedCharButton,
                    ]}
                  >
                    <Text style={styles.charButtonText}>{char}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        )}

        {formToShow1 === "all" && (
          <View>
            {/* Hiển thị nội dung của tab "Tất cả" */}
            <Text style={{ marginLeft: 20, fontSize: 20, marginTop: 10 }}>
              Hiển thị nội dung
            </Text>
            {/* Thêm nội dung khác của tab "Tất cả" nếu cần */}
          </View>
        )}

        {formToShow1 === "recent" && (
          <ScrollView>
            {/* Hiển thị nội dung của tab "Tất cả" */}
            <View>
              <Text
                style={{
                  marginLeft: 40,
                  marginTop: 40,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Cho phép hiển thị trạng thái truy cập
              </Text>
            </View>
            <View style={{ width: 400 }}>
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 15,
                }}
              >
                Bạn có thể thấy khi bạn bè truy cập. Bạn bè cũng xem
              </Text>
            </View>
            <View>
              <Text
                style={{
                  marginLeft: 85,
                  fontSize: 15,
                }}
              >
                được trạng thái truy cập của bạn
              </Text>
            </View>
            {/* Thêm nội dung khác của tab "Tất cả" nếu cần */}
            <Pressable
              style={{
                width: 200,
                height: 50,
                backgroundColor: "#CECDFF",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 100,
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "blue",
                  fontWeight: 700,
                }}
              >
                Cho phép
              </Text>
            </Pressable>
          </ScrollView>
        )}
        {/* Các trường hợp khác */}
        {formToShow === "group" && (
          <View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 90,
                  backgroundColor: "#DCDCDC",
                  marginTop: 15,
                  marginLeft: 30,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AntDesign name="addusergroup" size={30} color="#00BFFF" />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 400,
                    color: "#00BFFF",
                    marginTop: 30,
                    marginLeft: 20,
                  }}
                >
                  Tạo nhóm mới
                </Text>
              </View>
            </View>

            <View
              style={{
                borderWidth: 3,
                borderColor: "#DCDCDC",
                width: 420,
                marginTop: 20,
              }}
            ></View>

            <Text
              style={{
                fontSize: 15,
                fontWeight: 700,
                marginLeft: 20,
                marginTop: 10,
              }}
            >
              Tạo nhóm với:
            </Text>

            <View style={{ flex: 4 }}>
              <View style={{ flex: 2, flexDirection: "row", marginTop: 10 }}>
                <View style={{ flexDirection: "column" }}>
                  <Pressable
                    onPress={() => {
                      navigation.navigate("");
                    }}
                    style={{
                      width: 65,
                      height: 65,
                      borderRadius: 20,
                      backgroundColor: "#DCDCDC",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: 50,
                    }}
                  >
                    <AntDesign name="calendar" size={40} color="#00BFFF" />
                  </Pressable>

                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        marginTop: 10,
                        marginLeft: 65,
                        color: "#C0C0C0",
                      }}
                    >
                      Lịch
                    </Text>
                  </View>
                </View>

                <View>
                  <View
                    style={{
                      width: 65,
                      height: 65,
                      borderRadius: 20,
                      backgroundColor: "#DCDCDC",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: 60,
                    }}
                  >
                    <Ionicons name="alarm-outline" size={40} color="#FF0000" />
                  </View>

                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        marginTop: 10,
                        marginLeft: 55,
                        color: "#C0C0C0",
                      }}
                    >
                      Nhắc hẹn
                    </Text>
                  </View>
                </View>

                <View>
                  <View
                    style={{
                      width: 65,
                      height: 65,
                      borderRadius: 20,
                      backgroundColor: "#DCDCDC",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: 60,
                    }}
                  >
                    <MaterialIcons
                      name="data-saver-off"
                      size={40}
                      color="black"
                    />
                  </View>

                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        marginTop: 10,
                        marginLeft: 40,
                        color: "#C0C0C0",
                      }}
                    >
                      Nhóm Offline
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                borderWidth: 3,
                borderColor: "#DCDCDC",
                width: 420,
                marginTop: 20,
              }}
            ></View>

            <View style={{ flexDirection: "row" }}>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    marginLeft: 20,
                    marginTop: 10,
                  }}
                >
                  Nhóm đang tham gia
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={{ marginLeft: 100, marginTop: 15 }}>
                  <Image
                    source={require("../image/Vector1.png")}
                    style={{ width: 15, height: 15 }}
                  ></Image>
                </View>
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 5,
                    marginTop: 10,
                  }}
                >
                  Hoạt động cuối
                </Text>
              </View>
            </View>
          </View>
        )}
        {formToShow === "qa" && (
          <View style={{ backgroundColor: "#DCDCDC", width: 420, height: 800 }}>
            <View style={{ backgroundColor: "white", width: 420, height: 500 }}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../image/OA.png")}
                  style={{
                    width: 50,
                    height: 50,
                    marginTop: 10,
                    marginLeft: 20,
                  }}
                ></Image>
                <Text style={{ marginTop: 20, fontSize: 20, marginLeft: 20 }}>
                  Tìm thêm Official Account
                </Text>
              </View>

              <View>
                <Text style={{ marginTop: 20, fontSize: 20, marginLeft: 20 }}>
                  Official Account đang quan tâm
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../image/ZaloPay-logo.png")}
                  style={{
                    width: 50,
                    height: 50,
                    marginTop: 10,
                    marginLeft: 20,
                    borderRadius: 90,
                  }}
                ></Image>
                <Text style={{ marginTop: 20, fontSize: 20, marginLeft: 20 }}>
                  ZaloPay
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../image/Zaloofficialaccount.png")}
                  style={{
                    width: 50,
                    height: 50,
                    marginTop: 10,
                    marginLeft: 20,
                    borderRadius: 90,
                  }}
                ></Image>
                <Text style={{ marginTop: 20, fontSize: 20, marginLeft: 20 }}>
                  Zalo Official Account
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../image/unnamed.png")}
                  style={{
                    width: 50,
                    height: 50,
                    marginTop: 10,
                    marginLeft: 20,
                    borderRadius: 90,
                  }}
                ></Image>
                <Text style={{ marginTop: 20, fontSize: 20, marginLeft: 20 }}>
                  Zing MP3
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView>
      {/* Phần background của ứng dụng */}
      <ImageBackground
        source={require("../image/Untitled.png")}
        style={{ width: 420, height: 100 }}
      >
        <View>
          <View style={{ flexDirection: "row", marginTop: 60 }}>
            {/* Icon tìm kiếm */}
            <Image
              source={require("../image/material-symbols_search.png")}
              style={{ width: 30, height: 30, marginLeft: 20 }}
            ></Image>
            <View style={{ marginLeft: 20, marginTop: 2 }}>
              {/* Text hiển thị "Tìm kiếm" */}
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
            {/* Icon thêm bạn bè */}
            <View style={{ marginLeft: 100 }}>
              <AntDesign name="adduser" size={30} color="white" />
            </View>
          </View>
        </View>
      </ImageBackground>

      {/* Phần chứa các tab và nội dung */}
      <View
        style={{
          width: 420,
          height: 50,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* Tab "Bạn bè" */}
        <Pressable
          onPress={() => handlePress("friend")}
          style={[styles.tab, activeForm === "friend" && styles.activeTab]}
        >
          <Text
            style={[
              styles.tabText,
              activeForm === "friend" && styles.activeTabText1,
            ]}
          >
            Bạn bè
          </Text>
        </Pressable>

        {/* Tab "Nhóm" */}
        <Pressable
          onPress={() => handlePress("group")}
          style={[styles.tab, activeForm === "group" && styles.activeTab]}
        >
          <Text
            style={[
              styles.tabText,
              activeForm === "group" && styles.activeTabText1,
            ]}
          >
            Nhóm
          </Text>
        </Pressable>

        {/* Tab "QA" */}
        <Pressable
          onPress={() => handlePress("qa")}
          style={[styles.tab, activeForm === "qa" && styles.activeTab]}
        >
          <Text
            style={[
              styles.tabText,
              activeForm === "qa" && styles.activeTabText1,
            ]}
          >
            QA
          </Text>
        </Pressable>
      </View>

      {/* Đường kẻ phân cách giữa các phần */}
      <View
        style={{ borderWidth: 1, borderColor: "#C6C4C4", width: 420 }}
      ></View>

      {/* Nội dung tương ứng với tab được chọn */}
      {renderForm()}
    </ScrollView>
  );
}

// StyleSheet để tạo kiểu cho các phần giao diện
const styles = StyleSheet.create({
  tab: {
    marginLeft: 60,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tab2: {
    width: 120,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    marginLeft: 20,
    marginTop: 20,
  },
  tab1: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tabText: {
    color: "black", // Màu văn bản khi chưa được chọn
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: "black", // Màu đường gạch chân khi được chọn (đen)
  },
  activeTabText: {
    color: "black", // Màu văn bản khi được chọn
    fontWeight: "bold", // Để làm cho chữ đen đậm
    backgroundColor: "#C6C4C4",
    borderRadius: 20,
  },
  activeTabText1: {
    color: "black", // Màu văn bản khi được chọn
    fontWeight: "bold", // Để làm cho chữ đen đậm
  },
  // Thêm kiểu cho thanh dọc
  charButton: {
    width: 15,
    height: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#C6C4C4",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1, // Đảm bảo thanh chữ cái nằm trên cùng
    position: "relative", // Cho phép sử dụng zIndex
  },
  selectedCharButton: {
    backgroundColor: "#2D4ADF", // Màu nền khi được chọn
  },
  charButtonText: {
    fontSize: 10,
  },
  // Thêm kiểu cho thanh dọc
  sidePanel: {
    position: "absolute",
    top: 360,
    right: 10,
    bottom: 0,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    paddingVertical: 10,
  },
});
