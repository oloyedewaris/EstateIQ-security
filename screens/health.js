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

const Health = (props) => {
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
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Health & Wellness
          </Text>
        </Container>
        <Container marginLeft={5} marginTop={2}>
          <Text style={{ fontSize: 15, color: Colors.appTextGrey }}>
            Elevate your wellness journey with our premium range of services
            from our partners.
          </Text>
        </Container>

        <Vendcard
          source={AppIcons.cardfruit3}
          text1={"Healthy Optics"}
          text2={
            "Groceteria  is an establishment that exclusively sells food and drink items to patrons."
          }
        />
        <Vendcard
          source={AppIcons.cardfruit3}
          text1={"Healthy Optics"}
          text2={
            "Groceteria  is an establishment that exclusively sells food and drink items to patrons."
          }
        />
        <Vendcard
          source={AppIcons.cardfruit3}
          text1={"Healthy Optics"}
          text2={
            "Groceteria  is an establishment that exclusively sells food and drink items to patrons."
          }
        />
      </ScrollView>
    </Container>
  );
};
export default Health;
