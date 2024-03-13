import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
  TextInput,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Diary() {
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
              />
            </View>
            <View style={{ marginLeft: 60 }}>
              <SimpleLineIcons name="note" size={24} color="white" />
            </View>
            <View style={{ marginLeft: 20 }}>
              <Ionicons name="notifications-outline" size={28} color="white" />
            </View>
          </View>
        </View>
      </ImageBackground>

      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../image/hinhcanhan.png")}
            style={{
              width: 50,
              height: 50,
              marginTop: 10,
              marginLeft: 20,
              borderRadius: 90,
            }}
          ></Image>
          <Text style={{ marginTop: 20, fontSize: 20, marginLeft: 20 }}>
            Hôm nay bạn thế nào?
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Pressable
            style={{
              width: 90,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#DCDCDC",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <AntDesign name="picture" size={24} color="green" />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Ảnh
            </Text>
          </Pressable>

          <Pressable
            style={{
              width: 90,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#DCDCDC",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <AntDesign name="videocamera" size={24} color="pink" />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Video
            </Text>
          </Pressable>

          <Pressable
            style={{
              width: 90,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#DCDCDC",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <MaterialCommunityIcons name="image-album" size={24} color="blue" />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Album
            </Text>
          </Pressable>

          <Pressable
            style={{
              width: 90,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#DCDCDC",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <Entypo name="back-in-time" size={24} color="black" />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Kỉ niệm
            </Text>
          </Pressable>
        </View>

        <View
          style={{
            borderWidth: 6,
            borderColor: "#DCDCDC",
            width: 420,
            marginTop: 20,
          }}
        ></View>

        <View style={{ flexDirection: "row" }}>
          <View>
            <Text
              style={{
                marginTop: 10,
                fontSize: 15,
                marginLeft: 20,
                fontWeight: 500,
              }}
            >
              Khoảnh khắc
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row" }}>
              <View>
                <Image
                  source={require("../image/hinh-anh-tranh-phong-canh-dep_093819984.jpg")}
                  style={{
                    marginLeft: 20,
                    marginTop: 10,
                    width: 100,
                    height: 150,
                    borderRadius: 20,
                  }}
                ></Image>
              </View>
              <View>
                <Image
                  source={require("../image/phong-canh-thien-nhien-dep-1.jpg")}
                  style={{
                    marginLeft: 10,
                    marginTop: 10,
                    width: 100,
                    height: 150,
                    borderRadius: 20,
                  }}
                ></Image>
              </View>
              <View>
                <Image
                  source={require("../image/tranh-ve-thien-nhien-phong-thuy-voi-thac-nuoc-va-ho-xanh-tha_Z2AWK_085327665.jpg")}
                  style={{
                    marginLeft: 10,
                    marginTop: 10,
                    width: 100,
                    height: 150,
                    borderRadius: 20,
                  }}
                ></Image>
              </View>
              <View>
                <Image
                  source={require("../image/anh-phong-canh-tim-dep_093817887.jpg")}
                  style={{
                    marginLeft: 10,
                    marginTop: 10,
                    width: 100,
                    height: 150,
                    borderRadius: 20,
                  }}
                ></Image>
              </View>
            </View>
          </ScrollView>
        </View>

        <View
          style={{
            borderWidth: 6,
            borderColor: "#DCDCDC",
            width: 420,
            marginTop: 20,
          }}
        ></View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ marginLeft: 20, marginTop: 15 }}>
            <Image
              source={require("../image/ảnh nền.png")}
              style={{
                width: 50,
                height: 50,
                borderRadius: 90,
                marginTop: 5,
                resizeMode: "contain",
              }}
            ></Image>
          </View>
          <View>
            <Text
              style={{
                marginTop: 25,
                fontSize: 20,
                marginLeft: 20,
                fontWeight: 400,
              }}
            >
              Lê Quang Minh
            </Text>
            <Text style={{ fontSize: 15, marginLeft: 20, color: "#A1A1A1" }}>
              Hôm nay lúc 10:00
            </Text>
          </View>
          <View style={{ marginTop: 30, marginLeft: 150 }}>
            <AntDesign name="ellipsis1" size={25} color="black" />
          </View>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("../image/hinh-anh-rong-full-hd_104639724.jpg")}
            style={{
              width: 415,
              height: 300,
              marginTop: 10,
            }}
          ></Image>
        </View>

        <View style={{ flexDirection: "row", marginLeft: 25 }}>
          <View style={{ marginTop: 10, flexDirection: "row" }}>
            <View>
              <FontAwesome5
                name="laugh-beam"
                size={20}
                color="black"
                backgroundColor="#FFFF00"
              />
            </View>
            <View style={{ marginLeft: 5 }}>
              <AntDesign name="heart" size={20} color="red" />
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontWeight: 400,
                fontSize: 15,
                marginTop: 10,
                marginLeft: 10,
                color: "#A9A9A9",
              }}
            >
              10 người khác
            </Text>
            <Text
              style={{
                fontWeight: 400,
                fontSize: 15,
                marginTop: 10,
                marginLeft: 150,
                color: "#A9A9A9",
              }}
            >
              1 Bình luận
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginLeft: 25, marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#E8E9EB",
              borderRadius: "20px",
              height: 40,
              width: 90,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="hearto" size={24} color="black" />
            <Text style={{ fontWeight: 400, fontSize: 15 }}> Thích </Text>
          </View>
          <View
            style={{
              marginLeft: 5,
              flexDirection: "row",
              backgroundColor: "#E8E9EB",
              borderRadius: 20,
              height: 40,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="comment-processing-outline"
              size={24}
              color="black"
            />
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
          <View style={{ marginLeft: 20, marginTop: 15 }}>
            <Image
              source={require("../image/ảnh nền.png")}
              style={{
                width: 50,
                height: 50,
                borderRadius: 90,
                marginTop: 5,
                resizeMode: "contain",
              }}
            ></Image>
          </View>
          <View>
            <Text
              style={{
                marginTop: 25,
                fontSize: 20,
                marginLeft: 20,
                fontWeight: 400,
              }}
            >
              Lê Quang Lộc
            </Text>
            <Text style={{ fontSize: 15, marginLeft: 20, color: "#A1A1A1" }}>
              Hôm qua lúc 12:00
            </Text>
          </View>
          <View style={{ marginTop: 30, marginLeft: 150 }}>
            <AntDesign name="ellipsis1" size={25} color="black" />
          </View>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("../image/hinh-anh-cafe-dep.jpg")}
            style={{
              width: 415,
              height: 300,
              marginTop: 10,
            }}
          ></Image>
        </View>

        <View style={{ flexDirection: "row", marginLeft: 25 }}>
          <View style={{ marginTop: 10 }}>
            <AntDesign name="heart" size={20} color="red" />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontWeight: 400,
                fontSize: 15,
                marginTop: 10,
                marginLeft: 10,
                color: "#A9A9A9",
              }}
            >
              5 người khác
            </Text>
            <Text
              style={{
                fontWeight: 400,
                fontSize: 15,
                marginTop: 10,
                marginLeft: 180,
                color: "#A9A9A9",
              }}
            >
              2 Bình luận
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginLeft: 25, marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#E8E9EB",
              borderRadius: "20px",
              height: 40,
              width: 90,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="hearto" size={24} color="black" />
            <Text style={{ fontWeight: 400, fontSize: 15 }}> Thích </Text>
          </View>
          <View
            style={{
              marginLeft: 5,
              flexDirection: "row",
              backgroundColor: "#E8E9EB",
              borderRadius: 20,
              height: 40,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="comment-processing-outline"
              size={24}
              color="black"
            />
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
          <View style={{ marginLeft: 20, marginTop: 15 }}>
            <Image
              source={require("../image/75316046_431898767712197_2173511360267157504_n-1.png")}
              style={{
                width: 50,
                height: 50,
                borderRadius: 90,
                marginTop: 5,
                borderWidth: 1,
                resizeMode: "contain",
              }}
            ></Image>
          </View>
          <View>
            <Text
              style={{
                marginTop: 25,
                fontSize: 20,
                marginLeft: 20,
                fontWeight: 400,
              }}
            >
              ROYAL SCHOOL
            </Text>
            <Text style={{ fontSize: 15, marginLeft: 20, color: "#A1A1A1" }}>
              Được tài trợ
            </Text>
          </View>
          <View style={{ marginTop: 30, marginLeft: 130 }}>
            <AntDesign name="ellipsis1" size={25} color="black" />
          </View>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("../image/ZALO.png")}
            style={{
              width: 410,
              height: 300,
              marginTop: 10,
            }}
          ></Image>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              width: 410,
              marginTop: 10,
              fontSize: 20,
              fontWeight: 700,
              marginLeft: 20,
            }}
          >
            Chọn Chương trình Cambridge"Cùng Con Hội Nhập"
          </Text>
        </View>

        <Pressable
          style={{
            width: 395,
            height: 50,
            backgroundColor: "#DCDCDC",
            borderRadius: 20,
            marginLeft: 10,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={24}
            color="black"
          />
          <Text style={{ fontSize: 15, marginLeft: 10 }}>Chat ngay</Text>
        </Pressable>

        <View
          style={{
            borderWidth: 3,
            borderColor: "#DCDCDC",
            width: 420,
            marginTop: 20,
          }}
        ></View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ marginLeft: 20, marginTop: 15 }}>
            <Image
              source={require("../image/ảnh nền.png")}
              style={{
                width: 50,
                height: 50,
                borderRadius: 90,
                marginTop: 5,
                resizeMode: "contain",
              }}
            ></Image>
          </View>
          <View>
            <Text
              style={{
                marginTop: 25,
                fontSize: 20,
                marginLeft: 20,
                fontWeight: 400,
              }}
            >
              Nguyễn Thị Kiều Nghi
            </Text>
            <Text style={{ fontSize: 15, marginLeft: 20, color: "#A1A1A1" }}>
              Hôm nay lúc 12:00
            </Text>
          </View>
          <View style={{ marginTop: 30, marginLeft: 90 }}>
            <AntDesign name="ellipsis1" size={25} color="black" />
          </View>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("../image/GettyImages-1450106798.jpg")}
            style={{
              width: 415,
              height: 300,
              marginTop: 10,
            }}
          ></Image>
        </View>

        <View style={{ flexDirection: "row", marginLeft: 25 }}>
          <View style={{ marginTop: 10 }}>
            <AntDesign name="heart" size={20} color="red" />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontWeight: 400,
                fontSize: 15,
                marginTop: 10,
                marginLeft: 10,
                color: "#A9A9A9",
              }}
            >
              10 người khác
            </Text>
            <Text
              style={{
                fontWeight: 400,
                fontSize: 15,
                marginTop: 10,
                marginLeft: 150,
                color: "#A9A9A9",
              }}
            >
              10 Bình luận
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginLeft: 25, marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#E8E9EB",
              borderRadius: "20px",
              height: 40,
              width: 90,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="hearto" size={24} color="black" />
            <Text style={{ fontWeight: 400, fontSize: 15 }}> Thích </Text>
          </View>
          <View
            style={{
              marginLeft: 5,
              flexDirection: "row",
              backgroundColor: "#E8E9EB",
              borderRadius: 20,
              height: 40,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="comment-processing-outline"
              size={24}
              color="black"
            />
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
          <View style={{ marginLeft: 20, marginTop: 15 }}>
            <Image
              source={require("../image/ảnh nền.png")}
              style={{
                width: 50,
                height: 50,
                borderRadius: 90,
                marginTop: 5,
                resizeMode: "contain",
              }}
            ></Image>
          </View>
          <View>
            <Text
              style={{
                marginTop: 25,
                fontSize: 20,
                marginLeft: 20,
                fontWeight: 400,
              }}
            >
              Hà Đức Anh
            </Text>
            <Text style={{ fontSize: 15, marginLeft: 20, color: "#A1A1A1" }}>
              Hôm nay lúc 18:30
            </Text>
          </View>
          <View style={{ marginTop: 30, marginLeft: 150 }}>
            <AntDesign name="ellipsis1" size={25} color="black" />
          </View>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("../image/z5207731154138_f52a7bd3179d55f061a30abf3438ebf3.jpg")}
            style={{
              width: 415,
              height: 300,
              marginTop: 10,
            }}
          ></Image>
        </View>

        <View style={{ flexDirection: "row", marginLeft: 25 }}>
          <View style={{ marginTop: 10, flexDirection: "row" }}>
            <View>
              <FontAwesome5
                name="laugh-beam"
                size={20}
                color="black"
                backgroundColor="#FFFF00"
              />
            </View>
            <View style={{ marginLeft: 5 }}>
              <AntDesign name="heart" size={20} color="red" />
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontWeight: 400,
                fontSize: 15,
                marginTop: 10,
                marginLeft: 10,
                color: "#A9A9A9",
              }}
            >
              20 người khác
            </Text>
            <Text
              style={{
                fontWeight: 400,
                fontSize: 15,
                marginTop: 10,
                marginLeft: 150,
                color: "#A9A9A9",
              }}
            >
              5 Bình luận
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginLeft: 25, marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#E8E9EB",
              borderRadius: "20px",
              height: 40,
              width: 90,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="hearto" size={24} color="black" />
            <Text style={{ fontWeight: 400, fontSize: 15 }}> Thích </Text>
          </View>
          <View
            style={{
              marginLeft: 5,
              flexDirection: "row",
              backgroundColor: "#E8E9EB",
              borderRadius: 20,
              height: 40,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="comment-processing-outline"
              size={24}
              color="black"
            />
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
          <View style={{ marginLeft: 20, marginTop: 15 }}>
            <Image
              source={require("../image/ảnh nền.png")}
              style={{
                width: 50,
                height: 50,
                borderRadius: 90,
                marginTop: 5,
                resizeMode: "contain",
              }}
            ></Image>
          </View>
          <View>
            <Text
              style={{
                marginTop: 25,
                fontSize: 20,
                marginLeft: 20,
                fontWeight: 400,
              }}
            >
              Nguyễn Đan Trường
            </Text>
            <Text style={{ fontSize: 15, marginLeft: 20, color: "#A1A1A1" }}>
              Hôm nay lúc 18:30
            </Text>
          </View>
          <View style={{ marginTop: 30, marginLeft: 100 }}>
            <AntDesign name="ellipsis1" size={25} color="black" />
          </View>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("../image/Screenshot 2024-03-01 193509.png")}
            style={{
              width: 415,
              height: 300,
              marginTop: 10,
            }}
          ></Image>
        </View>

        <View style={{ flexDirection: "row", marginLeft: 25 }}>
          <View style={{ marginTop: 10 }}>
            <AntDesign name="heart" size={20} color="red" />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontWeight: 400,
                fontSize: 15,
                marginTop: 10,
                marginLeft: 10,
                color: "#A9A9A9",
              }}
            >
              7 người khác
            </Text>
            <Text
              style={{
                fontWeight: 400,
                fontSize: 15,
                marginTop: 10,
                marginLeft: 150,
                color: "#A9A9A9",
              }}
            >
              3 Bình luận
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginLeft: 25, marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#E8E9EB",
              borderRadius: "20px",
              height: 40,
              width: 90,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="hearto" size={24} color="black" />
            <Text style={{ fontWeight: 400, fontSize: 15 }}> Thích </Text>
          </View>
          <View
            style={{
              marginLeft: 5,
              flexDirection: "row",
              backgroundColor: "#E8E9EB",
              borderRadius: 20,
              height: 40,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="comment-processing-outline"
              size={24}
              color="black"
            />
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
      </ScrollView>
    </ScrollView>
  );
}
