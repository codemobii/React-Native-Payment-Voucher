import React, { Component } from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { Headline } from "react-native-paper";
import ToNavigator from "../navigations/top_navigator";

export default class Home extends Component {
  render() {
    return (
      <>
        <ToNavigator title="Home" back={false} />
        <View
          style={{
            paddingHorizontal: 20,
            backgroundColor: "#fff",
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../assets/buifort_logo.png")}
            style={{ width: "90%", height: 200, resizeMode: "contain" }}
          />
        </View>
      </>
    );
  }
}
