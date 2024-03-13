import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function Discover() {
  const arr = [
    {
      image1: require("../image/2.png"),
      name1: "Zalo Video",
    },
    {
      image1: require("../image/3.png"),
      name1: "Fiza",
    },
    {
      image1: require("../image/4.png"),
      name1: "ZaloPay",
    },
    {
      image1: require("../image/5.png"),
      name1: "Dịch vụ công",
    },
    {
      image1: require("../image/6.png"),
      name1: "Nhạc chờ zMelody",
    },
    {
      image1: require("../image/7.png"),
      name1: "Tìm Việc",
    },
    {
      image1: require("../image/8.png"),
      name1: "Nạp tiền điện thoại",
    },
    {
      image1: require("../image/9.png"),
      name1: "Xem thêm",
    },
  ];

  const data = [
    { image: require("../image/1.1.png"), text: "Ví QR" },
    { image: require("../image/1.2.png"), text: "Zalo Shop" },
    { image: require("../image/1.3.png"), text: "Al Avatar" },
    { image: require("../image/1.4.png"), text: "Tiến Lên..." },
    { image: require("../image/1.5.png"), text: "Tú Lơ Khơ" },
    { image: require("../image/1.6.png"), text: "Poker Việt..." },
    { image: require("../image/1.7.png"), text: "Grazy Tiế..." },
    { image: require("../image/1.8.png"), text: "Lịch bóng..." },
    { image: require("../image/1.9.png"), text: "ZCá Vua B..." },
    { image: require("../image/2.0.png"), text: "Lịch Việt" },
    { image: require("../image/2.1.png"), text: "Sổ chi tiêu" },
    { image: require("../image/2.2.png"), text: "Cờ Tướng" },
    { image: require("../image/2.3.png"), text: "Zalo Conn..." },
    { image: require("../image/2.4.png"), text: "Xem thêm" },
  ];
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
            <View style={{ marginLeft: 100 }}>
              <MaterialIcons name="qr-code-scanner" size={24} color="white" />
            </View>
          </View>
        </View>
      </ImageBackground>

      <View style={{ backgroundColor: "white" }}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../image/1.png")}
          style={{ width: 30, height: 30, marginLeft: 20, marginTop: 10 }}
        ></Image>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 400,
            marginLeft: 20,
            marginTop: 15,
          }}
        >
          Mini Apps yêu thích
        </Text>

        <Text
          style={{
            fontSize: 15,
            fontWeight: 400,
            marginLeft: 100,
            marginTop: 15,
            color: "#1E90FF",
          }}
        >
          Chỉnh sửa
        </Text>
      </View>

      <FlatList
        data={arr}
        numColumns={4}
        renderItem={({ item }) => {
          return (
            <View style={{ marginTop: 20, marginLeft: 10 }}>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={item.image1}
                  style={{ width: 50, height: 50 }}
                ></Image>
              </View>
              <View
                style={{
                  width: 90,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    marginTop: 10,
                  }}
                >
                  {item.name1}
                </Text>
              </View>
            </View>
          );
        }}
      ></FlatList>

      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 400,
            marginLeft: 20,
            marginTop: 20,
            color: "#808080",
          }}
        >
          Sử dụng gần đây
        </Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          {data.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Image source={item.image} style={styles.image}></Image>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View
        style={{
          borderWidth: 3,
          borderColor: "#DCDCDC",
          width: 420,
          marginTop: 40,
        }}
      ></View>

      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../image/1.png")}
          style={{ width: 30, height: 30, marginLeft: 20, marginTop: 10 }}
        ></Image>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 400,
            marginLeft: 20,
            marginTop: 15,
          }}
        >
          Mini Apps nổi bật
        </Text>
        <View style={{ marginLeft: 170, marginTop: 20 }}>
          <AntDesign name="right" size={18} color="#C0C0C0" />
        </View>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../image/a.png")}
          style={{
            marginTop: 25,
            width: 50,
            height: 50,
            marginLeft: 20,
          }}
        ></Image>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                marginTop: 20,
                fontSize: 20,
                marginLeft: 10,
                fontWeight: 600,
              }}
            >
              Bảo hiểm online
            </Text>
            <View
              style={{
                width: 40,
                height: 20,
                marginTop: 24,
                backgroundColor: "red",
                borderRadius: 90,
                marginLeft: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white" }}>Hot</Text>
            </View>
          </View>
          <Text style={{ fontSize: 15, marginLeft: 10 }}>
            Dễ dàng mua bảo hiểm xe máy, ô tô, tai nạn
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 10 }}>
              <Entypo name="users" size={13} color="#A9A9A9" />
            </View>
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
                color: "#A9A9A9",
                bottom: 1,
              }}
            >
              Hơn 3.5 triệu người dùng
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          borderWidth: 1,
          borderColor: "#DCDCDC",
          width: 390,
          marginTop: 20,
          marginLeft: 25,
        }}
      ></View>

      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../image/c.png")}
          style={{
            marginTop: 25,
            width: 50,
            height: 50,
            marginLeft: 20,
          }}
        ></Image>
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                marginTop: 30,
                fontSize: 20,
                marginLeft: 10,
                fontWeight: 600,
              }}
            >
              Nạp điện thoại
            </Text>
            <View
              style={{
                width: 40,
                height: 20,
                marginTop: 32,
                backgroundColor: "green",
                borderRadius: 90,
                marginLeft: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white" }}>Mới</Text>
            </View>
          </View>
          <Text style={{ fontSize: 15, marginLeft: 10 }}>
            Nạp điện thoại, mua thẻ điện thoại nhanh
          </Text>
        </View>
      </View>

      <View
        style={{
          borderWidth: 1,
          borderColor: "#DCDCDC",
          width: 390,
          marginTop: 20,
          marginLeft: 25,
        }}
      ></View>

      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../image/b.png")}
          style={{
            marginTop: 25,
            width: 50,
            height: 50,
            marginLeft: 20,
          }}
        ></Image>
        <View>
          <Text
            style={{
              marginTop: 20,
              fontSize: 20,
              marginLeft: 10,
              fontWeight: 600,
            }}
          >
            ZSticker
          </Text>
          <Text style={{ fontSize: 15, marginLeft: 10 }}>
            Khám phá & quản lý sticker zalo
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 10 }}>
              <Entypo name="users" size={13} color="#A9A9A9" />
            </View>
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
                color: "#A9A9A9",
                bottom: 1,
              }}
            >
              Hơn 1 triệu người dùng
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          borderWidth: 3,
          borderColor: "#DCDCDC",
          width: 420,
          marginTop: 40,
        }}
      ></View>

      <View style={{ flexDirection: "column" }}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../image/e.png")}
            style={{ width: 20, height: 20, marginLeft: 20, marginTop: 8 }}
          ></Image>
          <Text
            style={{
              marginTop: 8,
              fontSize: 15,
              marginLeft: 5,
              fontWeight: 600,
            }}
          >
            Dò vé số
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 15,
              marginLeft: 10,
              fontWeight: 600,
              color: "gray",
            }}
          >
            : Miền Nam, 8 tháng 3
          </Text>
          <View style={{ marginLeft: 90, marginTop: 10 }}>
            <AntDesign name="right" size={18} color="#C0C0C0" />
          </View>
        </View>
        <ScrollView>
          <View style={{ flexDirection: "row" }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                source={require("../image/d.png")}
                style={{
                  width: 350,
                  height: 150,
                  resizeMode: "contain",
                  marginLeft: 30,
                  marginTop: 20,
                }}
              ></Image>
            </View>
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          borderWidth: 3,
          borderColor: "#DCDCDC",
          width: 420,
          marginTop: 40,
        }}
      ></View>

      <View style={{ flexDirection: "column" }}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../image/f.png")}
            style={{ width: 20, height: 20, marginLeft: 20, marginTop: 8 }}
          ></Image>
          <Text
            style={{
              marginTop: 8,
              fontSize: 15,
              marginLeft: 5,
              fontWeight: 600,
            }}
          >
            Tìm Việc
          </Text>
          <View style={{ marginLeft: 250, marginTop: 10 }}>
            <AntDesign name="right" size={18} color="#C0C0C0" />
          </View>
        </View>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../image/g.png")}
              style={{
                marginTop: 25,
                width: 60,
                height: 60,
                marginLeft: 20,
                borderRadius: 10,
              }}
            ></Image>
            <View>
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 20,
                  marginLeft: 10,
                  fontWeight: 600,
                }}
              >
                NHÂN VIÊN GIAO HÀNG HÀ NỘI
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginLeft: 5 }}>
                  <Entypo name="location-pin" size={15} color="#808080" />
                </View>
                <Text
                  style={{ fontSize: 15, marginLeft: 5, color: "#808080" }}
                >
                  Hà Nội, Hoài Đức
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 8,
                    color: "#FFA500",
                    bottom: 1,
                  }}
                >
                  15 - 20 triệu/tháng
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../image/h.png")}
              style={{
                marginTop: 25,
                width: 60,
                height: 60,
                marginLeft: 20,
                borderRadius: 10,
              }}
            ></Image>
            <View>
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 20,
                  marginLeft: 10,
                  fontWeight: 600,
                }}
              >
                Tuyển phụ kho thời vụ khu vực HCM
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginLeft: 5 }}>
                  <Entypo name="location-pin" size={15} color="#808080" />
                </View>
                <Text
                  style={{ fontSize: 15, marginLeft: 5, color: "#808080" }}
                >
                  Tp.HCM, Gò Vấp
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 8,
                    color: "#FFA500",
                    bottom: 1,
                  }}
                >
                  8 - 13 triệu/tháng
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../image/JT-Express-Logo-Font.png")}
              style={{
                marginTop: 25,
                width: 60,
                height: 60,
                marginLeft: 20,
                borderRadius: 10,
                resizeMode: "stretch",
              }}
            ></Image>
            <View>
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 20,
                  marginLeft: 10,
                  fontWeight: 600,
                }}
              >
                Tuyển 10 nhân viên giao hàng Thủ Đức...
                <br />
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginLeft: 5 }}>
                  <Entypo name="location-pin" size={15} color="#808080" />
                </View>
                <Text
                  style={{ fontSize: 15, marginLeft: 5, color: "#808080" }}
                >
                  Tp.HCM, Thủ Đức
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 8,
                    color: "#FFA500",
                    bottom: 1,
                  }}
                >
                  6 - 20 triệu/tháng
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../image/logo-fpt.jpg")}
              style={{
                marginTop: 25,
                width: 60,
                height: 60,
                marginLeft: 20,
                borderRadius: 10,
                resizeMode: "stretch",
              }}
            ></Image>
            <View>
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 20,
                  marginLeft: 10,
                  fontWeight: 600,
                }}
              >
                TUYỂN 3 NHÂN VIÊN KINH DOANH...
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginLeft: 5 }}>
                  <Entypo name="location-pin" size={15} color="#808080" />
                </View>
                <Text
                  style={{ fontSize: 15, marginLeft: 5, color: "#808080" }}
                >
                  Long An, Tân An
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 8,
                    color: "#FFA500",
                    bottom: 1,
                  }}
                >
                  4 - 15 triệu/tháng
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../image/Shinhan_Vertical.jpg")}
              style={{
                marginTop: 25,
                width: 60,
                height: 60,
                marginLeft: 20,
                borderRadius: 10,
                resizeMode: "stretch",
              }}
            ></Image>
            <View>
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 20,
                  marginLeft: 10,
                  fontWeight: 600,
                }}
              >
                Tuyển 5 nhân viên telesale quận Tân Bình
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginLeft: 5 }}>
                  <Entypo name="location-pin" size={15} color="#808080" />
                </View>
                <Text
                  style={{ fontSize: 15, marginLeft: 5, color: "#808080" }}
                >
                  Tp.HCM, Tân Bình
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 8,
                    color: "#FFA500",
                    bottom: 1,
                  }}
                >
                  10 - 25 triệu/tháng
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../image/lifegym.png")}
              style={{
                marginTop: 25,
                width: 60,
                height: 60,
                marginLeft: 20,
                borderRadius: 10,
                resizeMode: "stretch",
              }}
            ></Image>
            <View>
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 20,
                  marginLeft: 10,
                  fontWeight: 600,
                }}
              >
                S'LIFE GYM CẦN TUYỂN PT ĐA DẠNG
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginLeft: 5 }}>
                  <Entypo name="location-pin" size={15} color="#808080" />
                </View>
                <Text
                  style={{ fontSize: 15, marginLeft: 5, color: "#808080" }}
                >
                  Tp.HCM, Gò Vấp
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 8,
                    color: "#FFA500",
                    bottom: 1,
                  }}
                >
                  3 - 30 triệu/tháng
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../image/aia.png")}
              style={{
                marginTop: 25,
                width: 60,
                height: 60,
                marginLeft: 20,
                borderRadius: 10,
                resizeMode: "stretch",
              }}
            ></Image>
            <View>
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 20,
                  marginLeft: 10,
                  fontWeight: 600,
                }}
              >
                Tuyển 5 chuyên viên tư vấn bảo hiểm...
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginLeft: 5 }}>
                  <Entypo name="location-pin" size={15} color="#808080" />
                </View>
                <Text
                  style={{ fontSize: 15, marginLeft: 5, color: "#808080" }}
                >
                  Tp.HCM, Quận 3
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 8,
                    color: "#FFA500",
                    bottom: 1,
                  }}
                >
                  10 - 50 triệu/tháng
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../image/ITEL.png")}
              style={{
                marginTop: 25,
                width: 60,
                height: 60,
                marginLeft: 20,
                borderRadius: 10,
                resizeMode: "stretch",
              }}
            ></Image>
            <View>
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 20,
                  marginLeft: 10,
                  fontWeight: 600,
                }}
              >
                TUYỂN GẤP 10 NHÂN VIÊN CHỐT...
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginLeft: 5 }}>
                  <Entypo name="location-pin" size={15} color="#808080" />
                </View>
                <Text
                  style={{ fontSize: 15, marginLeft: 5, color: "#808080" }}
                >
                  Hà Nội, Nam Từ Liêm
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 8,
                    color: "#FFA500",
                    bottom: 1,
                  }}
                >
                  8 - 15 triệu/tháng
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          borderWidth: 3,
          borderColor: "#DCDCDC",
          width: 420,
          marginTop: 40,
        }}
      ></View>

      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../image/zaloconnect.png")}
          style={{ width: 20, height: 20, marginLeft: 20, marginTop: 8 }}
        ></Image>
        <Text
          style={{
            marginTop: 8,
            fontSize: 15,
            marginLeft: 5,
            fontWeight: 600,
          }}
        >
          Zalo Connect
        </Text>
        <View
          style={{
            backgroundColor: "#B0E0E6",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 8,
            marginLeft: 10,
            width: 100,
            height: 22,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "#0000CD",
            }}
          >
            15+ Bài mới
          </Text>
        </View>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={require("../image/connect1.png")}
              style={{
                width: 400,
                height: 300,
                resizeMode: "contain",
                marginBottom: 15,
              }}
            ></Image>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={require("../image/connect2.png")}
              style={{
                width: 400,
                height: 300,
                resizeMode: "contain",
                marginBottom: 15,
                marginLeft: 20,
              }}
            ></Image>
          </View>
        </View>
      </ScrollView>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 15,
  },
  itemContainer: {
    alignItems: "center",
    marginLeft: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  text: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 10,
  },
});
