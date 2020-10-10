import React from "react";
import { View, Text } from "react-native";
import { IconButton } from "react-native-paper";

export default function AddButton() {
  return (
    <IconButton
      icon="ios-add"
      color="#fff"
      size={20}
      onPress={() => console.log("Pressed")}
      style={{ backgroundColor: "red" }}
    />
  );
}
