import React from "react";
import { Appbar } from "react-native-paper";

export default function ToNavigator(props) {
  return (
    <Appbar.Header>
      {props.back ? <Appbar.BackAction onPress={() => {}} /> : false}
      <Appbar.Content title={props.title} />
    </Appbar.Header>
  );
}
