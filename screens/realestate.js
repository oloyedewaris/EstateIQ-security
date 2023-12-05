import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Container, ImageWrap, TouchWrap } from "../helper/index";
import { AppIcons } from "../helper/images";

import { useState } from "react";

import { AntDesign } from "@expo/vector-icons";
import { Colors, FONT_FAMILY, RH, RW, RF, RR } from "../helper/constants";

import Vendcard from "../component/vendcard";

const Realestate = (props) => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 150 : 0;
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Container flex={1} backgroundColor={"#FFFFFF"}>
      <ScrollView>
        <TouchableOpacity
          style={{
            marginTop: "11%",
            marginLeft: "5%",
            flexDirection: "row",
            height: 20,
            width: 100,

            alignItems: "center",
          }}
          onPress={() => props.navigation.goBack()}
        >
          <AntDesign name="left" size={15} color="black" />
          <Text style={{ color: "black", paddingLeft: 5 }}>Back</Text>
        </TouchableOpacity>
        <Container marginTop={2} marginLeft={5}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Real Estate</Text>
        </Container>
        <Container marginLeft={5} marginTop={2}>
          <Text style={{ fontSize: 15, color: Colors.appTextGrey }}>
            Enjoy exclusive discounts on rentals and sales from our partners
            when you use our privilege codes!
          </Text>
        </Container>

        <Vendcard
          source={AppIcons.cardhouse2}
          text1={"Dynamic Real Estate"}
          text2={
            "we excel in helping you find, buy, sell, or invest in real estate. Our dynamic team combines industry expertise with cutting-edge technology to deliver seamless.."
          }
        />
        <Vendcard
          source={AppIcons.cardhouse}
          text1={"Open Real Estate"}
          text2={
            "we excel in helping you find, buy, sell, or invest in real estate. Our dynamic team combines industry expertise with cutting-edge technology to deliver seamless........"
          }
        />
        <Vendcard
          source={AppIcons.cardhouse2}
          text1={"Dynamic Real Estate"}
          text2={
            "we excel in helping you find, buy, sell, or invest in real estate. Our dynamic team combines industry expertise with cutting-edge technology to deliver seamless........"
          }
        />
      </ScrollView>
    </Container>
  );
};
export default Realestate;
