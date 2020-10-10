import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

//Screens
import Home from "../screens/home";
import CreateVoucher from "../screens/create_voucher";
import Admin from "../screens/admin";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{ showLabel: false }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => (
              <IconButton
                icon="ios-home"
                color={focused ? "#fa4935" : "#ccc"}
                size={24}
              />
            ),
          }}
        />
        <Tab.Screen
          name="CreateVoucher"
          component={CreateVoucher}
          options={{
            tabBarLabel: "Setting",
            showLabel: false,
            tabBarIcon: ({ focused }) => (
              <TouchableWithoutFeedback
                containerStyle={{
                  backgroundColor: "#3f418d",
                  marginTop: -35,
                  elevation: 10,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.3,
                  shadowRadius: 100,
                  width: 55,
                  height: 55,
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="md-add" size={32} color="#fff" />
              </TouchableWithoutFeedback>
            ),
          }}
        />
        <Tab.Screen
          name="Admin"
          component={Admin}
          options={{
            tabBarLabel: "Setting",
            showLabel: false,
            tabBarIcon: ({ focused }) => (
              <IconButton
                icon="ios-person"
                color={focused ? "#fa4935" : "#ccc"}
                size={24}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
