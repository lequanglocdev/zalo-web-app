import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Pressable,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const years = [];
for (let i = 1900; i <= new Date().getFullYear(); i++) {
  years.push(i.toString());
}

const months = [];
for (let i = 1; i <= 12; i++) {
  months.push("Tháng " + i.toString());
}

const days = [];
for (let i = 1; i <= 31; i++) {
  days.push(i.toString());
}

export default function Dateofbirth({ navigation }) {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState("1");
  const [selectedDay, setSelectedDay] = useState("1");
  const [gender, setGender] = useState(""); // State để theo dõi giới tính được chọn
  const [isComplete, setIsComplete] = useState(false); // State để theo dõi xem đã chọn đủ thông tin chưa
  // Function để xử lý khi chọn giới tính
  const handleGenderSelection = (selectedGender) => {
    setGender(selectedGender);
    setIsComplete(
      selectedGender !== "" &&
        selectedYear !== "" &&
        selectedMonth !== "" &&
        selectedDay !== ""
    ); // Kiểm tra xem đã chọn đủ thông tin chưa
  };

  // Function để xử lý khi thay đổi ngày tháng năm
  const handleDateChange = (value, type) => {
    switch (type) {
      case "year":
        setSelectedYear(value);
        break;
      case "month":
        setSelectedMonth(value);
        break;
      case "day":
        setSelectedDay(value);
        break;
    }
    setIsComplete(
      gender !== "" &&
        selectedYear !== "" &&
        selectedMonth !== "" &&
        selectedDay !== ""
    ); // Kiểm tra xem đã chọn đủ thông tin chưa
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require("../image/Untitled.png")}
        style={{ width: 420, height: 100 }}
      >
        <View>
          <View style={{ marginLeft: 15, marginTop: 60 }}>
            <Text style={{ fontSize: 20, color: "white" }}>
              Ngày sinh và giới tính
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View
        style={{
          backgroundColor: "#DCDCDC",
          height: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 16 }}>
          Điền ngày sinh và giới tính để nhận nội dung phù hợp
        </Text>
      </View>

      <View>
        <Text style={{ fontSize: 15, marginLeft: 10, marginTop: 10 }}>
          Giới tính
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Pressable
          style={{
            width: 100,
            height: 100,
            borderWidth: 1,
            borderRadius: 90,
            alignItems: "center",
            justifyContent: "center",
            borderColor: gender === "Nam" ? "green" : "#DCDCDC", // Xác định màu của khung nam dựa trên giá trị của state gender
          }}
          onPress={() => handleGenderSelection("Nam")} // Gọi hàm xử lý khi chọn nam
        >
          <View>
            <Image
              source={require("../image/boy.png")}
              style={{ width: 80, height: 80, marginTop: 60 }}
            />
          </View>
          <MaterialCommunityIcons
            name="sticker-check-outline"
            size={24}
            color={gender === "Nam" ? "green" : "black"} // Xác định màu của icon dựa trên giá trị của state gender
          />
          <View>
            <Text
              style={{
                fontSize: 16,
                marginTop: 20,
                fontWeight: "bold",
                color: gender === "Nam" ? "green" : "black", // Xác định màu của chữ dựa trên giá trị của state gender
              }}
            >
              Nam
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={{
            width: 100,
            height: 100,
            borderWidth: 1,
            borderRadius: 90,
            alignItems: "center",
            justifyContent: "center",
            borderColor: gender === "Nữ" ? "green" : "#DCDCDC", // Xác định màu của khung nữ dựa trên giá trị của state gender
            marginLeft: 80,
          }}
          onPress={() => handleGenderSelection("Nữ")} // Gọi hàm xử lý khi chọn nữ
        >
          <View>
            <Image
              source={require("../image/teacher.png")}
              style={{ width: 80, height: 80, marginTop: 60 }}
            />
          </View>
          <MaterialCommunityIcons
            name="sticker-check-outline"
            size={24}
            color={gender === "Nữ" ? "green" : "black"} // Xác định màu của icon dựa trên giá trị của state gender
          />
          <View>
            <Text
              style={{
                fontSize: 16,
                marginTop: 20,
                fontWeight: "bold",
                color: gender === "Nữ" ? "green" : "black", // Xác định màu của chữ dựa trên giá trị của state gender
              }}
            >
              Nữ
            </Text>
          </View>
        </Pressable>
      </View>

      <View
        style={{
          borderWidth: 3,
          borderColor: "#DCDCDC",
          width: 420,
          marginTop: 150,
        }}
      ></View>

      <View>
        <Text style={{ fontSize: 15, marginLeft: 10, marginTop: 10 }}>
          Ngày sinh
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {/* dd */}
        <Picker
          style={{ width: 100, height: 150 }}
          selectedValue={selectedDay}
          onValueChange={(itemValue, itemIndex) => setSelectedDay(itemValue)}
        >
          {days.map((day, index) => (
            <Picker.Item label={day} value={day} key={index} />
          ))}
        </Picker>
        {/* mm */}
        <Picker
          style={{ width: 150, height: 150 }}
          selectedValue={selectedMonth}
          onValueChange={(itemValue, itemIndex) => setSelectedMonth(itemValue)}
        >
          {months.map((month, index) => (
            <Picker.Item label={month} value={month} key={index} />
          ))}
        </Picker>
        {/* yyyy */}
        <Picker
          style={{ width: 150, height: 150 }}
          selectedValue={selectedYear}
          onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}
        >
          {years.map((year, index) => (
            <Picker.Item label={year} value={year} key={index} />
          ))}
        </Picker>
      </View>

      <View style={{ alignItems: "center" }}>
        <Pressable
          onPress={() => {
            navigation.navigate("Avatar");
          }}
          style={{
            marginTop: 180,
            width: 250,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 90,
            backgroundColor: isComplete ? "#116CF5" : "#DCDCDC", // Thay đổi màu của khung "Tiếp tục" dựa vào trạng thái isComplete
          }}
        >
          <Text style={{ fontSize: 18, color: "white" }}>Tiếp tục</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
