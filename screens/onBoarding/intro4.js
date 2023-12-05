import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { Container, ImageWrap, TouchWrap } from "../../helper/index";
import { AppIcons } from "../../helper/images";
import { useState, useEffect, useCallback } from "react";
import LongButton from "../../component/longbutton";
import { Colors } from "../../helper/constants";
import { useFocusEffect } from "@react-navigation/native";
const { width } = Dimensions.get("window");

const Intro4 = (props) => {
  // useFocusEffect(
  //   useCallback(() => {
  //     const timeoutID = setTimeout(() => props.navigation.navigate("login"), 4000);

  //     return () => {
  //       clearTimeout(timeoutID);
  //     };
  //   }, [])
  // )

  return (
    <Container
      flex={1}
      backgroundColor={"#FFFFFF"}
      horizontalAlignment="center"
    >
      <Container height={50} width={100}>
        <Image
          source={AppIcons.intro4}
          fit="contain"
          style={{ height: "100%", width: "100%" }}
        />
      </Container>
      <Container width={55} height={5} marginTop={3}>
        <ImageWrap source={AppIcons.loads} fit="contain" />
      </Container>
      <Container width={72} height={3} marginTop={3}>
        <ImageWrap source={AppIcons.safe} fit="contain" />
      </Container>
      <Container
        width={90}
        horizontalAlignment="center"
        verticalAlignment="center"
        marginTop={3}
      >
        <Text
          style={{
            color: "black",
            fontSize: 16,

            textAlign: "center",
          }}
        >
          Estate managers can support and strengthen their security architecture
          with EstateIQ.
        </Text>
      </Container>
      <Container marginTop={7}>
        <LongButton
          text={" Sign in"}
          onPress={() => props.navigation.navigate("login")}
        />
      </Container>

      <StatusBar style="auto" />
    </Container>
  );
};
export default Intro4;
