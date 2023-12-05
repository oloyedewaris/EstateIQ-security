import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Container, ImageWrap, TouchWrap } from "../helper/index";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../helper/constants";
import { AppIcons } from "../helper/images";
import LongButton from "../component/longbutton";
import { useRoute } from "@react-navigation/native";
import { formattedDateToUse } from "../utils/formatDate";
import { useMutation } from "react-query";
import { modifyAccessLog } from "../api/accessCode";

const Verified = ({ navigation }) => {
  const route = useRoute()
  const accessData = route.params?.data;

  console.log('accessData', accessData)

  const revokeMutation = useMutation(
    (type) => {
      const formToUse = new FormData()
      formToUse.append('access', type)
      formToUse.append('access_code', accessData?.access_code)
      return modifyAccessLog(formToUse)
    },
    {
      onSuccess: res => {
        Alert.alert('Successful', 'Action successfully taken', [{
          text: 'Ok',
          onPress: () => navigation.goBack()
        }])
      },
      onError: err => {
        Alert.alert('An error occurred', JSON.stringify(err?.response?.data))
      }
    }
  )

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
          onPress={() => navigation.navigate("Settings")}
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
          <Text style={{ fontWeight: '700', color: '#1037B5', fontSize: 25 }}>Code Verified</Text>
          {/* <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, marginTop: 14 }}>Wednesday, September 09,1 1, &16 2023</Text>
          <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, marginTop: 6 }}>10:00AM - 7:00PM</Text> */}
        </Container>


        <Container
          width={100}
          marginTop={3}
          verticalAlignment="center"
          horizontalAlignment="space-around"
          direction="row"
        >
          <LongButton
            np={40}
            text={'Grant'}
            isLoading={revokeMutation.isLoading}
            onPress={() => revokeMutation.mutate('GRANT')}
          />
          <LongButton
            backgroundColor='red'
            np={40}
            text={'Decline'}
            isLoading={revokeMutation.isLoading}
            onPress={() => revokeMutation.mutate('REVOKE')}
          />
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
              }}>{accessData?.access_log_type}</Text>
          </Container>

          {accessData?.access_code && (
            <Container
              width={90}
              height={7}
              verticalAlignment="center"
              horizontalAlignment="space-between"
              direction="row"
            >
              <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Access Code:</Text>
              <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>{accessData?.access_code}</Text>
            </Container>
          )}

          {accessData?.first_name && (
            <Container
              width={90}
              height={7}
              verticalAlignment="center"
              horizontalAlignment="space-between"
              direction="row"
            >
              <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Guest Name:</Text>
              <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>
                {accessData?.first_name} {accessData?.last_name}
              </Text>
            </Container>
          )}

          {accessData?.access_type && (
            <Container
              width={90}
              height={7}
              verticalAlignment="center"
              horizontalAlignment="space-between"
              direction="row"
            >
              <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Access Type:</Text>
              <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>{accessData?.access_type}</Text>
            </Container>
          )}

          {accessData?.category && (
            <Container
              width={90}
              height={7}
              verticalAlignment="center"
              horizontalAlignment="space-between"
              direction="row"
            >
              <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Category:</Text>
              <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>{accessData?.category}</Text>
            </Container>
          )}

          {accessData?.vehicle_number && (
            <Container
              width={90}
              height={7}
              verticalAlignment="center"
              horizontalAlignment="space-between"
              direction="row"
            >
              <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Vehicle Number:</Text>
              <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>{accessData?.vehicle_number}</Text>
            </Container>
          )}

          {accessData?.from_date && (
            <Container
              width={90}
              height={7}
              verticalAlignment="center"
              horizontalAlignment="space-between"
              direction="row"
            >
              <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Arrival Date:</Text>
              <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>{formattedDateToUse(accessData?.from_date)}</Text>
            </Container>
          )}

          {accessData?.to_date && (
            <Container
              width={90}
              height={7}
              verticalAlignment="center"
              horizontalAlignment="space-between"
              direction="row"
            >
              <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Departure Date:</Text>
              <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>{formattedDateToUse(accessData?.to_date)}</Text>
            </Container>
          )}

          {accessData?.gender && (
            <Container
              width={90}
              height={7}
              verticalAlignment="center"
              horizontalAlignment="space-between"
              direction="row"
            >
              <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Gender:</Text>
              <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>{accessData?.gender}</Text>
            </Container>
          )}

          {accessData?.quantity && (
            <Container
              width={90}
              height={7}
              verticalAlignment="center"
              horizontalAlignment="space-between"
              direction="row"
            >
              <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Quantity:</Text>
              <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>{accessData?.quantity}</Text>
            </Container>
          )}

          {accessData?.phone && (
            <Container
              width={90}
              height={7}
              verticalAlignment="center"
              horizontalAlignment="space-between"
              direction="row"
            >
              <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Phone:</Text>
              <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>{accessData?.phone}</Text>
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
          marginBottom={2}
        >
          <Container
            marginTop={3}
            width={90}
            verticalAlignment="center"
            horizontalAlignment="flex-start"
          // direction="row"
          >
            <Text style={{ fontWeight: '500', color: '#1037B5', fontSize: 16, }}>Host</Text>
            <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>
              {accessData?.estate_user?.user?.first_name} {accessData?.estate_user?.user?.last_name}
            </Text>
          </Container>
          <Container
            marginTop={3}
            width={90}
            verticalAlignment="center"
            horizontalAlignment="flex-start"
          // direction="row"
          >
            <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Address</Text>
            <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>
              {accessData?.address}
            </Text>
          </Container>
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
export default Verified;
