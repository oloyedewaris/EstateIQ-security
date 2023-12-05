import {
  StyleSheet,
  Text,
  View,
  Modal,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { Container, ImageWrap, TouchWrap } from "../helper";

import { useState } from "react";
import { Colors } from "../helper/constants";

export default function Vendcard(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSeen, setModalSeen] = useState(false);
  const keyboardVerticalOffset = Platform.OS === "ios" ? 150 : 10;
  const [reminder, SetReminder] = useState();

  return (
    <Container>
      <Container
        marginLeft={3}
        marginTop={1}
        padding={2}
        borderRadius={10}
        width={90}
      >
        <Container height={25} width={90}>
          <ImageWrap fit="stretch" source={{ uri: props.source }} />
        </Container>
        <Container
          width={90}
          padding={2}
          borderBottomLeftRadius={5}
          borderBottomRightRadius={5}
          backgroundColor={"white"}
          elevation={15}
          marginTop={-2}
        >
          <Container marginTop={2} marginLeft={4}>
            <Text
              style={{
                color: Colors.appPrimaryBlue,
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              {props.text1}
            </Text>
          </Container>
          <Container marginTop={2} marginLeft={4} width={82}>
            <Text
              style={{
                color: Colors.appTextGrey,
                fontSize: 14,
              }}
            >
              {props.text2}
            </Text>
          </Container>
          <TouchWrap onPress={props.onPress}>
            <Container
              height={5}
              width={35}
              borderRadius={5}
              backgroundColor={Colors.appPrimaryBlue}
              verticalAlignment="center"
              horizontalAlignment="center"
              marginLeft={3}
              marginBottom={2}
              marginTop={2}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Make an Enquiry
              </Text>
            </Container>
          </TouchWrap>
        </Container>
      </Container>
    </Container>
  );
}
