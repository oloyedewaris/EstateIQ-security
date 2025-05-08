import {
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
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
          mt={2}
          width={100}
          height={10}
          verticalAlignment="center"
          horizontalAlignment="center"
        >
          {estateUserData?.profile_image ? (
            <Image
              borderRadius={200}
              fit="contain"
              style={{ width: 100, height: 100 }}
              source={{ uri: `https://api.estateiq.ng/${estateUserData?.profile_image}` }}
            />
          ) : (
            <ImageWrap width={15} source={AppIcons.check} fit="contain" />
          )}
        </Container>

        <Container
          width={100}
          verticalAlignment="center"
          horizontalAlignment="center"
        >
          <Text style={{ marginTop: 20, fontWeight: '700', color: '#1037B5', fontSize: 25 }}>User Verified</Text>
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
              }}>Status</Text>
          </Container>

          {Boolean(userData?.first_name) && (
            <Container
              width={90}
              height={7}
              verticalAlignment="center"
              horizontalAlignment="space-between"
              direction="row"
            >
              <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Name:</Text>
              <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>
                {userData?.first_name} {userData?.last_name}
              </Text>
            </Container>
          )}

          {Boolean(userData?.email) && (
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
          {Boolean(userData?.mobile) && (
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
          {Boolean(estateData?.address) && (
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
        </Container>

        <Container
          width={100}
          height={0.3}
          marginTop={1}
          marginBottom={10}
          backgroundColor={Colors.appInactiveGrey}
        />



        <Container
          width={100}
          height={10}
          verticalAlignment="center"
          horizontalAlignment="center"
          marginBottom={10}
        >
          <ImageWrap height={30} width={40} source={AppIcons.estate} fit="contain" />
        </Container>


      </ScrollView >
    </Container >
  );
};
export default UserScreen;
