import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";

import {
  Message,
  Phonebook,
  Discover,
  Diary,
  User,
  Login,
  ScreenLogin,
  ScreenRegister,
  Setting,
  SendMessager,
  Friend,
  CountryListScreen,
  Otp,
} from "./src/view";

const Tab = createBottomTabNavigator();

function MyTabs({ route }) {
  const { selectedLanguage } = route.params || "vi";

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: 80,
          backgroundColor: "#fff",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconComponent;
          let labelComponent;

          if (route.name === "Tin nhắn") {
            iconComponent = (
              <AntDesign
                name="message1"
                size={24}
                color={focused ? "#0000FF" : "black"}
              />
            );
            labelComponent = (
              <Text style={{ color: focused ? "#0000FF" : "black" }}>
                {selectedLanguage === "vi" ? "Tin nhắn" : "Messages"}
              </Text>
            );
          } else if (route.name === "Danh bạ") {
            iconComponent = (
              <AntDesign
                name="contacts"
                size={24}
                color={focused ? "#0000FF" : "black"}
              />
            );
            labelComponent = (
              <Text style={{ color: focused ? "#0000FF" : "black" }}>
                {selectedLanguage === "vi" ? "Danh bạ" : "Contacts"}
              </Text>
            );
          } else if (route.name === "Khám phá") {
            iconComponent = (
              <Image
                source={require("./src/image/dashboard-3.png")}
                style={{
                  width: 20,
                  marginTop: 6,
                  tintColor: focused ? "#0000FF" : "black",
                }}
              />
            );
            labelComponent = (
              <Text
                style={{ color: focused ? "#0000FF" : "black", marginTop: 4 }}
              >
                {selectedLanguage === "vi" ? "Khám phá" : "Discovery"}
              </Text>
            );
          } else if (route.name === "Nhật ký") {
            iconComponent = (
              <Ionicons
                name="time-outline"
                size={25}
                color={focused ? "#0000FF" : "black"}
              />
            );
            labelComponent = (
              <Text style={{ color: focused ? "#0000FF" : "black" }}>
                {selectedLanguage === "vi" ? "Nhật ký" : "Timeline"}
              </Text>
            );
          } else if (route.name === "Cá nhân") {
            iconComponent = (
              <FontAwesome
                name="user-o"
                size={22}
                color={focused ? "#0000FF" : "black"}
              />
            );
            labelComponent = (
              <Text
                style={{ marginTop: 5, color: focused ? "#0000FF" : "black" }}
              >
                {selectedLanguage === "vi" ? "Cá nhân" : "Me"}
              </Text>
            );
          }
          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 80,
              }}
            >
              {iconComponent}
              {labelComponent}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Tin nhắn" component={Message} />
      <Tab.Screen name="Danh bạ" component={Phonebook} />
      <Tab.Screen name="Khám phá" component={Discover} />
      <Tab.Screen name="Nhật ký" component={Diary} />
      <Tab.Screen name="Cá nhân" component={User} />
    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Message" component={MyTabs} />
        <Stack.Screen name="Phonebook" component={Phonebook} />
        <Stack.Screen name="Discover" component={Discover} />
        <Stack.Screen name="Diary" component={Diary} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="ScreenLogin" component={ScreenLogin} />
        <Stack.Screen name="ScreenRegister" component={ScreenRegister} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="SendMessager" component={SendMessager} />
        <Stack.Screen name="Friend" component={Friend} />
        <Stack.Screen name="CountryListScreen" component={CountryListScreen} />
        <Stack.Screen name="Otp" component={Otp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
