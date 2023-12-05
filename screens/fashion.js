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
  ActivityIndicator,
} from "react-native";
import { Container, ImageWrap, TouchWrap } from "../helper/index";
import { AppIcons } from "../helper/images";

import { useState } from "react";

import { AntDesign } from "@expo/vector-icons";
import { Colors, FONT_FAMILY, RH, RW, RF, RR } from "../helper/constants";

import Vendcard from "../component/vendcard";
import { useQuery } from "react-query";
import { fetchAdverts } from "../api/advert";

const Fashion = (props) => {
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
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Fashion & Lifestyle
          </Text>
        </Container>
        <Container marginLeft={5} marginTop={2}>
          <Text style={{ fontSize: 15, color: Colors.appTextGrey }}>
            Fashion & Lifestyle Get as much as a 30% discount on bestselling
            brands and other benefits like free delivery when you use our
            privilege codes!
          </Text>
        </Container>

        {advertsQuery.isLoading ? (
          <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={Colors.appPrimaryBlue} />
          </View>
        ) : !adverts?.length ? (
          <>
            <Container height={40} width={100}>
              <ImageWrap source={AppIcons.lists} fit="contain" />
            </Container>
            <Container>
              <Text style={{ fontWeight: "bold", fontSize: 16, textAlign: "center" }}>
                No advert yet!
              </Text>
            </Container>
          </>
        ) : (
          <>
            {adverts?.map((advert, i) => (
              <Vendcard
                key={advert.id}
                source={advert.image}
                text1={advert?.title}
                text2={advert?.description}
              />
            ))}
          </>
        )}
      </ScrollView>
    </Container>
  );
};
export default Fashion;
