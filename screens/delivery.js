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
import { AntDesign } from "@expo/vector-icons";
import { Colors, FONT_FAMILY, RH, RW, RF, RR } from "../helper/constants";
import Vendcard from "../component/vendcard";

const Delivery = (props) => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 150 : 0;

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
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Delivery</Text>
        </Container>
        <Container marginLeft={5} marginTop={2}>
          <Text style={{ fontSize: 15, color: Colors.appTextGrey }}>
            Get as much as a 10% discount. For courier services, same-day
            delivery, to and from anywhere in Lagos when you use our partners
          </Text>
        </Container>

        <Vendcard
          source={AppIcons.deliver}
          text1={"Coyote Couriers"}
          text2={
            " is your go-to delivery and logistics partner, known for its speed, reliability, and resourcefulness."
          }
        />
        <Vendcard
          source={AppIcons.cycle1}
          text1={"Coyote Couriers"}
          text2={
            " is your go-to delivery and logistics partner, known for its speed, reliability, and resourcefulness."
          }
        />
        <Vendcard
          source={AppIcons.deliver}
          text1={"Coyote Couriers"}
          text2={
            " is your go-to delivery and logistics partner, known for its speed, reliability, and resourcefulness."
          }
        />
      </ScrollView>
    </Container>
  );
};
export default Delivery;
