import React from "react";
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import AppNavigator from "./src/navigations/app_navigator";

const theme = {
  ...DefaultTheme,
  roundness: 6,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3f418d",
    accent: "#f1c40f",
  },
};

export default function App() {
  return (
    <PaperProvider
      theme={theme}
      settings={{
        icon: (props) => <Ionicons {...props} />,
      }}
    >
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="rgba(0,0,0,0.3)"
      />
      <AppNavigator />
    </PaperProvider>
  );
}
