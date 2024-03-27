import { View, Text, ScrollView, ImageBackground, Pressable, TextInput } from 'react-native'
import React from 'react'
import { Ionicons, AntDesign, Entypo, Feather } from "@expo/vector-icons";

export default function Otp({ navigation }) {

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
                            <Text style={{ fontSize: 18, color: "white" }}>
                                Mã OTP
                            </Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>

            <View style={{ alignItems: "center", }}>
                <View style={{ width: 400, height: 80, justifyContent: "center", alignItems: "center", }}>
                    <Text style={{ fontSize: 18, fontWeight: 400, }}>Vui lòng không chia sẻ mã xác thực để tránh mất tài khoản</Text>
                </View>
            </View>

            <TextInput
                placeholder="Nhập mã"
            />

            <Pressable onPress={() => {
                navigation.navigate("Login");
            }}
                style={{
                    width: 350,
                    height: 50,
                    backgroundColor: "#DCDCDC",
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 20,
                }}>
                <Text
                    style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "white",
                        fontWeight: 700,
                    }}
                >
                    Xác Nhận
                </Text>
            </Pressable>

        </ScrollView>
    )
}