import {
  StyleSheet,
  Text,
  View,
  Modal,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";

import { Container, ImageWrap, TouchWrap } from "../helper";

import { useState } from "react";

import { Colors, RW } from "../helper/constants";

export default function LongButton({
  np,
  width,
  borderWidth,
  disabled,
  isLoading,
  onPress,
  text,
  ...rest
}) {
  return (
    <Container direction="row">
      <Container width={np || 85}>
        <TouchableHighlight
          disabled={isLoading || disabled}
          style={{
            height: 40,
            width: RW(width) || "100%",
            backgroundColor: Colors.appPrimaryBlue,
            borderRadius: 7,
            paddingLeft: 10,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: borderWidth ? borderWidth : 0,
            borderColor: borderWidth ? "#F1CD15" : "#F1CD15",
          }}
          onPress={onPress}
          {...rest}
        >
          {isLoading ? (
            <ActivityIndicator color={"white"} />
          ) : (
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
              {text}
            </Text>
          )}
        </TouchableHighlight>
      </Container>
    </Container>
  );
}
