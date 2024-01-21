import {
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Container, ImageWrap, TouchWrap } from "../helper/index";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../helper/constants";
import { AppIcons } from "../helper/images";
import { useRoute } from "@react-navigation/native";
import { formattedDateToUse } from "../utils/formatDate";

const UserScreen = ({ navigation }) => {
  const route = useRoute()
  const estateUserData = route.params?.data?.estate_user;
  const estateData = route.params?.data?.estate_user?.estate;
  const userData = route.params?.data?.estate_user?.user;

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
          onPress={() => navigation.navigate("buttomTab")}
        >
          <AntDesign name="left" size={15} color="black" />
          <Text style={{ color: "black", paddingLeft: 5 }}>Back</Text>
        </TouchableOpacity>

        <Container
          width={100}
          height={10}
          verticalAlignment="center"
          horizontalAlignment="center"
        >
          <ImageWrap width={15} source={AppIcons.check} fit="contain" />
        </Container>

        <Container
          width={100}
          verticalAlignment="center"
          horizontalAlignment="center"
        >
          <Text style={{ fontWeight: '700', color: '#1037B5', fontSize: 25 }}>User Verified</Text>
        </Container>


        <Container
          width={100}
          paddingHorizontal={5}
        >
          <Container
            width={90}
            verticalAlignment="center"
            horizontalAlignment="flex-start"
          >
            <Text
              style={{
                fontWeight: '700',
                color: '#000',
                fontSize: 16,
                marginTop: 39,
                borderBottomWidth: 3,
                borderBottomColor: '#F1CD15'
              }}>Member's detail</Text>
          </Container>

          {userData?.first_name && (
            <Container
              width={90}
              height={7}
              verticalAlignment="center"
              horizontalAlignment="space-between"
              direction="row"
            >
              <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Member's name:</Text>
              <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>
                {userData?.first_name} {userData?.last_name}
              </Text>
            </Container>
          )}

          {userData?.email && (
            <Container
              width={90}
              height={7}
              verticalAlignment="center"
              horizontalAlignment="space-between"
              direction="row"
            >
              <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Email:</Text>
              <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>{userData?.email}</Text>
            </Container>
          )}

          {userData?.mobile && (
            <Container
              width={90}
              height={7}
              verticalAlignment="center"
              horizontalAlignment="space-between"
              direction="row"
            >
              <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Mobile:</Text>
              <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>{userData?.mobile}</Text>
            </Container>
          )}
        </Container>

        <Container
          width={100}
          height={0.3}
          marginTop={1}
          backgroundColor={Colors.appInactiveGrey}
        />


        <Container
          width={100}
          paddingHorizontal={5}
        >

          <Container
            width={90}
            verticalAlignment="center"
            horizontalAlignment="flex-start"
          >
            <Text
              style={{
                fontWeight: '700',
                color: '#000',
                fontSize: 16,
                marginTop: 39,
                borderBottomWidth: 3,
                borderBottomColor: '#F1CD15'
              }}>Estate detail</Text>
          </Container>

          {estateData?.name && (
            <Container
              width={90}
              height={7}
              verticalAlignment="center"
              horizontalAlignment="space-between"
              direction="row"
            >
              <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Name:</Text>
              <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>
                {estateData?.name}
              </Text>
            </Container>
          )}

          {estateData?.address && (
            <Container
              width={90}
              height={7}
              verticalAlignment="center"
              horizontalAlignment="space-between"
              direction="row"
            >
              <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Address:</Text>
              <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>{estateData?.address}</Text>
            </Container>
          )}

          {estateData?.estate_id && (
            <Container
              width={90}
              height={7}
              verticalAlignment="center"
              horizontalAlignment="space-between"
              direction="row"
            >
              <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Estate ID:</Text>
              <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>{estateData?.estate_id}</Text>
            </Container>
          )}
        </Container>

        <Container
          width={100}
          height={10}
          verticalAlignment="center"
          horizontalAlignment="center"
          marginBottom={10}
        >
          <ImageWrap height={30} width={40} source={AppIcons.estate} fit="contain" />
        </Container>


      </ScrollView>
    </Container>
  );
};
export default UserScreen;
