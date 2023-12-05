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
import { Button, H1 } from "../helper/element";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import LongButton from "../component/longbutton";
import Foundation from "react-native-vector-icons/Foundation";
import { AntDesign } from "@expo/vector-icons";
import { Colors, FONT_FAMILY, RH, RW, RF, RR } from "../helper/constants";
import Setting from "../component/settingbutton";
import { useQuery } from "react-query";
import { fetchAdverts } from "../api/advert";

const Vendor = (props) => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 150 : 0;
  const [modalVisible, setModalVisible] = useState(false);
  const advertsQuery = useQuery(['fetchAdverts'], fetchAdverts)

  const adverts = advertsQuery?.data?.data?.results

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
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Marketplace</Text>
        </Container>
        <Container marginLeft={5}>
          <Text style={{ fontSize: 15, color: Colors.appTextGrey }}>
            {" "}
            Reach out directly to advertised brands
          </Text>
        </Container>

        <Container
          width={90}
          height={15}
          marginLeft={5}
          direction="row"
          verticalAlignment="center"
          marginTop={3}
        >
          <Container height={13} width={23} horizontalAlignment="center">
            <TouchWrap onPress={() => props.navigation.navigate("groceries")}>
              <Container width={17} height={8} borderRadius={50}>
                <ImageWrap source={AppIcons.circle1} fit="contain" />
                <Text style={{ fontSize: 13, color: Colors.appPrimaryBlue }}>
                  Groceries Shopping
                </Text>
              </Container>
            </TouchWrap>
          </Container>
          <Container height={13} width={23} horizontalAlignment="center">
            <TouchWrap onPress={() => props.navigation.navigate("health")}>
              <Container width={17} height={8} borderRadius={50}>
                <ImageWrap source={AppIcons.circle2} fit="contain" />
                <Text style={{ fontSize: 13, color: Colors.appPrimaryBlue }}>
                  Health & Wellness
                </Text>
              </Container>
            </TouchWrap>
          </Container>

          <Container height={13} width={23} horizontalAlignment="center">
            <TouchWrap onPress={() => props.navigation.navigate("realestate")}>
              <Container width={17} height={8} borderRadius={50}>
                <ImageWrap source={AppIcons.circle3} fit="contain" />
                <Text
                  style={{
                    fontSize: 13,
                    color: Colors.appPrimaryBlue,
                    textAlign: "center",
                  }}
                >
                  Real Estate
                </Text>
              </Container>
            </TouchWrap>
          </Container>
          <Container height={13} width={23} horizontalAlignment="center">
            <TouchWrap onPress={() => props.navigation.navigate("fashion")}>
              <Container width={17} height={8} borderRadius={50}>
                <ImageWrap source={AppIcons.circle4} fit="contain" />
                <Text
                  style={{
                    fontSize: 13,
                    color: Colors.appPrimaryBlue,
                    textAlign: "center",
                  }}
                >
                  Fashion & Lifestyle
                </Text>
              </Container>
            </TouchWrap>
          </Container>
        </Container>

        <Container
          width={90}
          height={15}
          marginLeft={5}
          direction="row"
          verticalAlignment="center"
        >
          <Container height={13} width={24} horizontalAlignment="center">
            <TouchWrap onPress={() => props.navigation.navigate("automobile")}>
              <Container width={20} height={8} borderRadius={50}>
                <ImageWrap source={AppIcons.circle5} fit="contain" />
                <Text
                  style={{
                    fontSize: 13,
                    color: Colors.appPrimaryBlue,
                    textAlign: "center",
                  }}
                >
                  Automobile
                </Text>
              </Container>
            </TouchWrap>
          </Container>
          <Container height={13} width={23} horizontalAlignment="center">
            <TouchWrap onPress={() => props.navigation.navigate("delivery")}>
              <Container width={17} height={8} borderRadius={50}>
                <ImageWrap source={AppIcons.circle6} fit="contain" />
                <Text style={{ fontSize: 13, color: Colors.appPrimaryBlue }}>
                  Delivery
                </Text>
              </Container>
            </TouchWrap>
          </Container>
        </Container>
        <Container marginTop={2} marginLeft={5}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Home Service</Text>
        </Container>
        <Container marginLeft={5}>
          <Text style={{ fontSize: 15, color: Colors.appTextGrey }}>
            {" "}
            Prompt & Quality Services for on-demand home service. Book vetted
            technicians /Artisans fast
          </Text>
        </Container>

        <Container
          width={90}
          height={15}
          marginLeft={5}
          direction="row"
          verticalAlignment="center"
          marginTop={3}
        >
          <Container height={13} width={23} horizontalAlignment="center">
            <TouchWrap>
              <Container width={17} height={8} borderRadius={50}>
                <ImageWrap source={AppIcons.circle7} fit="contain" />
                <Text style={{ fontSize: 13, color: Colors.appPrimaryBlue }}>
                  Ac Repair
                </Text>
              </Container>
            </TouchWrap>
          </Container>
          <Container height={13} width={23} horizontalAlignment="center">
            <TouchWrap>
              <Container width={17} height={8} borderRadius={50}>
                <ImageWrap source={AppIcons.circle8} fit="contain" />
                <Text
                  style={{
                    fontSize: 13,
                    color: Colors.appPrimaryBlue,
                    textAlign: "center",
                  }}
                >
                  Chef
                </Text>
              </Container>
            </TouchWrap>
          </Container>

          <Container height={13} width={23} horizontalAlignment="center">
            <TouchWrap>
              <Container width={17} height={8} borderRadius={50}>
                <ImageWrap source={AppIcons.circle15} fit="contain" />
                <Text
                  style={{
                    fontSize: 13,
                    color: Colors.appPrimaryBlue,
                    textAlign: "center",
                  }}
                >
                  Cleaning
                </Text>
              </Container>
            </TouchWrap>
          </Container>
          <Container height={13} width={23} horizontalAlignment="center">
            <TouchWrap>
              <Container width={17} height={8} borderRadius={50}>
                <ImageWrap source={AppIcons.circle10} fit="contain" />
                <Text
                  style={{
                    fontSize: 13,
                    color: Colors.appPrimaryBlue,
                    textAlign: "center",
                  }}
                >
                  Gardener
                </Text>
              </Container>
            </TouchWrap>
          </Container>
        </Container>
        <Container
          width={90}
          height={15}
          marginLeft={5}
          direction="row"
          verticalAlignment="center"
        >
          <Container height={13} width={23} horizontalAlignment="center">
            <TouchWrap>
              <Container width={17} height={8} borderRadius={50}>
                <ImageWrap source={AppIcons.circle11} fit="contain" />
                <Text style={{ fontSize: 13, color: Colors.appPrimaryBlue }}>
                  Plumber
                </Text>
              </Container>
            </TouchWrap>
          </Container>
          <Container height={13} width={23} horizontalAlignment="center">
            <TouchWrap>
              <Container width={17} height={8} borderRadius={50}>
                <ImageWrap source={AppIcons.circle12} fit="contain" />
                <Text
                  style={{
                    fontSize: 13,
                    color: Colors.appPrimaryBlue,
                    textAlign: "center",
                  }}
                >
                  Security
                </Text>
              </Container>
            </TouchWrap>
          </Container>

          <Container height={13} width={23} horizontalAlignment="center">
            <TouchWrap>
              <Container width={18} height={8} borderRadius={50}>
                <ImageWrap source={AppIcons.circle13} fit="contain" />
                <Text
                  style={{
                    fontSize: 13,
                    color: Colors.appPrimaryBlue,
                    textAlign: "center",
                  }}
                >
                  Electrician
                </Text>
              </Container>
            </TouchWrap>
          </Container>
          <Container height={13} width={23} horizontalAlignment="center">
            <TouchWrap>
              <Container width={20} height={8} borderRadius={50}>
                <ImageWrap source={AppIcons.circle14} fit="contain" />
                <Text
                  style={{
                    fontSize: 13,
                    color: Colors.appPrimaryBlue,
                    textAlign: "center",
                  }}
                >
                  Fumigation
                </Text>
              </Container>
            </TouchWrap>
          </Container>
        </Container>
        <Container
          width={90}
          height={15}
          marginLeft={5}
          direction="row"
          verticalAlignment="center"
        >
          <Container height={13} width={23} horizontalAlignment="center">
            <TouchWrap>
              <Container width={17} height={8} borderRadius={50}>
                <ImageWrap source={AppIcons.circle9} fit="contain" />
                <Text style={{ fontSize: 13, color: Colors.appPrimaryBlue }}>
                  Carpenter
                </Text>
              </Container>
            </TouchWrap>
          </Container>
          <Container height={13} width={23} horizontalAlignment="center">
            <TouchWrap>
              <Container width={17} height={8} borderRadius={50}>
                <ImageWrap source={AppIcons.circle16} fit="contain" />
                <Text
                  style={{
                    fontSize: 13,
                    color: Colors.appPrimaryBlue,
                    textAlign: "center",
                  }}
                >
                  Painter
                </Text>
              </Container>
            </TouchWrap>
          </Container>

          <Container height={13} width={23} horizontalAlignment="center">
            <TouchWrap>
              <Container width={17} height={8} borderRadius={50}>
                <ImageWrap source={AppIcons.circle17} fit="contain" />
                <Text
                  style={{
                    fontSize: 13,
                    color: Colors.appPrimaryBlue,
                    textAlign: "center",
                  }}
                >
                  Tailor
                </Text>
              </Container>
            </TouchWrap>
          </Container>
          <Container height={13} width={23} horizontalAlignment="center">
            <TouchWrap>
              <Container width={17} height={8} borderRadius={50}>
                <ImageWrap source={AppIcons.circle18} fit="contain" />
                <Text
                  style={{
                    fontSize: 13,
                    color: Colors.appPrimaryBlue,
                    textAlign: "center",
                  }}
                >
                  Mechanic
                </Text>
              </Container>
            </TouchWrap>
          </Container>
        </Container>
        <Container
          width={90}
          height={15}
          marginLeft={5}
          direction="row"
          verticalAlignment="center"
        >
          <Container height={13} width={23} horizontalAlignment="center">
            <TouchWrap>
              <Container width={20} height={8} borderRadius={50}>
                <ImageWrap source={AppIcons.circle19} fit="contain" />
                <Text style={{ fontSize: 13, color: Colors.appPrimaryBlue }}>
                  Photograph
                </Text>
              </Container>
            </TouchWrap>
          </Container>
          <Container height={13} width={23} horizontalAlignment="center">
            <TouchWrap>
              <Container width={17} height={8} borderRadius={50}>
                <ImageWrap source={AppIcons.circle20} fit="contain" />
                <Text
                  style={{
                    fontSize: 13,
                    color: Colors.appPrimaryBlue,
                    textAlign: "center",
                  }}
                >
                  Barber
                </Text>
              </Container>
            </TouchWrap>
          </Container>
        </Container>
      </ScrollView>
    </Container>
  );
};
export default Vendor;
