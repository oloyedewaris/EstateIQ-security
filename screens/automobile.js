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

const Automobile = (props) => {
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
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>AutoMobile</Text>
        </Container>
        <Container marginLeft={5} marginTop={2} width={90}>
          <Text style={{ fontSize: 15, color: Colors.appTextGrey }}>
            Rental services that cover airport shuttle, parking, and diagnosis.
          </Text>
        </Container>

        <Vendcard
          source={AppIcons.cardcar2}
          text1={"DriverPro"}
          text2={
            " is your go-to delivery and logistics partner, known for its speed, reliability, and resourcefulness."
          }
        />
        <Vendcard
          source={AppIcons.cardcar1}
          text1={"DriverPro"}
          text2={
            " is your go-to delivery and logistics partner, known for its speed, reliability, and resourcefulness."
          }
        />
        <Vendcard
          source={AppIcons.cardcar2}
          text1={"DriverPro"}
          text2={
            " is your go-to delivery and logistics partner, known for its speed, reliability, and resourcefulness."
          }
        />
      </ScrollView>
    </Container>
  );
};
export default Automobile;
