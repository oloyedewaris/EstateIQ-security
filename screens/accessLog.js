import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import { Container, TouchWrap } from "../helper/index";
import { Colors } from "../helper/constants";
import { useMutation, useQuery } from "react-query";
import { getAccessLogs, modifyAccessLog } from "../api/accessCode";
import convertDate, { formattedDateToUse } from "../utils/formatDate";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import Entypo from "react-native-vector-icons/Entypo";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { AntDesign } from "@expo/vector-icons";

const AccessLog = (props) => {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [logToView, setLogToView] = useState(null)
  const [modalVisible, setModalVisible] = useState(false);
  const accessQuery = useQuery(['getAccessLogs', search, status], () => getAccessLogs(search, status));
  const logsData = accessQuery?.data?.data?.results

  const revokeMutation = useMutation(
    (formData, type) => {
      const formToUse = new FormData()
      formToUse.append('access', type)
      formToUse.append('access_code', formData.access_code)
      return modifyAccessLog(formToUse)
    },
    {
      onSuccess: res => {
        Alert.alert('Successful', 'Access code status changed')
      },
      onError: err => {
        Alert.alert('An error occurred', err?.response?.data)
      }
    }
  )

  return (
    <Container
      flex={1}
      backgroundColor={"#FFFFFF"}
      horizontalAlignment="center"
      paddingBottom={8}
    >
      <Container marginTop={7} marginLeft={5} width={90}>
        <Text style={{ fontWeight: "500", fontSize: 18, marginTop: 10 }}>
          Access Log
        </Text>

        <Text
          style={{
            fontWeight: "400",
            fontSize: 14,
            marginTop: 20,
            color: "#616161",
          }}
        >
          Keep track of permissions granted to your facility and resources
        </Text>
      </Container>

      <Container
        direction="row"
        horizontalAlignment="space-around"
        width={92}
        marginTop={4}
      >
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#EAE5E5",
            borderRadius: 6,
            width: "50%",
            paddingVertical: 4,
            paddingLeft: 10,
          }}
          placeholder="Search Name"
          value={search}
          onChangeText={text => setSearch(text)}
          placeholderTextColor={"#616161"}
        />


        <Dropdown
          style={{
            borderWidth: 1,
            borderColor: "#EAE5E5",
            borderRadius: 6,
            width: "35%",
            paddingVertical: 4,
            paddingLeft: 10,
          }}

          selectedTextStyle={{ fontSize: 16 }}
          placeholderStyle={{ opacity: 0.5 }}
          data={[
            { label: 'ENTRY', value: 'ENTRY' },
            { label: 'EXIT', value: 'EXIT' },
          ]}
          maxHeight={500}
          labelField="label"
          valueField="value"
          placeholder="Status"
          value={status}
          onChange={(data => setStatus(data.value))}
        />
      </Container>

      <Container
        verticalAlignment="center"
        horizontalAlignment="space-between"
        marginTop={4}
        direction="row"
        backgroundColor={"#406AD8"}
        paddingHorizontal={4}
        paddingVertical={2}
        width={100}
      >
        <Text
          style={{
            textAlign: 'left',
            width: '30%',
            fontWeight: "600",
            fontSize: 15,
            color: "white",
          }}
        >
          Host Name
        </Text>

        <Text
          style={{
            textAlign: 'left',
            width: '30%',
            fontWeight: "600",
            fontSize: 15,
            color: "white",
          }}
        >
          Guest Name
        </Text>

        <Text
          style={{
            textAlign: 'left',
            width: '25%',
            fontWeight: "600",
            fontSize: 15,
            color: "white",
          }}
        >
          Access
        </Text>
        <Text
          style={{
            width: '15%',
            fontWeight: "600",
            fontSize: 15,
            color: "white",
          }}
        >
        </Text>
      </Container>

      <ScrollView showsVerticalScrollIndicator={false}>
        {accessQuery?.isLoading ? (
          <View style={{ backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center', width: 60, height: 60, borderRadius: 1000 }}>
            <ActivityIndicator size={35} color={Colors.appPrimaryBlue} />
          </View>
        ) : (
          <>
            {logsData?.map(log => (
              <Container
                key={log.id}
                verticalAlignment="center"
                horizontalAlignment="space-between"
                direction="row"
                backgroundColor={"#F2F4F6"}
                paddingHorizontal={4}
                paddingVertical={2}
                width={100}
              >
                <Text
                  style={{
                    textAlign: 'left',
                    width: '30%',
                    fontWeight: "300",
                    fontSize: 13,
                  }}
                >
                  {log?.estate_user?.user?.first_name} {log?.estate_user?.user?.last_name}
                </Text>
                <Text
                  style={{
                    textAlign: 'left',
                    width: '30%',
                    fontWeight: "300",
                    fontSize: 13,
                  }}
                >
                  {log?.first_name} {log?.last_name}
                </Text>

                <Text
                  style={{
                    textAlign: 'left',
                    width: '25%',
                    fontWeight: "500",
                    fontSize: 13,
                    color: log?.access === 'REVOKE' ? 'red' : log?.access === 'GRANT' ? 'green' : '-'
                  }}
                >
                  {log?.access === 'REVOKE' ? 'Denied' : log?.access === 'GRANT' ? 'Granted' : 'Not used'}
                </Text>

                <TouchWrap
                  style={{
                    textAlign: 'left',
                    width: '15%',
                    fontWeight: "500",
                    fontSize: 15,
                  }}
                  onPress={() => {
                    setLogToView(log);
                    setModalVisible(true)
                  }}
                >
                  <Text>
                    View
                  </Text>
                </TouchWrap>

              </Container>
            ))}
          </>
        )}
      </ScrollView>


      <Modal onRequestClose={() => setModalVisible(false)} animationType="slide" visible={modalVisible} transparent>
        <Container
          flex={1}
          verticalAlignment="center"
          horizontalAlignment="center"
          backgroundColor={"rgba(0, 0, 0, 0.7)"}
        >
          <Container
            height={60}
            width={90}
            verticalAlignment="center"
            horizontalAlignment="center"
            backgroundColor={"white"}
            borderRadius={10}
          >
            <Container width={10} marginLeft={70} marginTop={2}>
              <TouchWrap onPress={() => setModalVisible(false)}>
                <AntDesign name="close" size={24} color="black" />
              </TouchWrap>
            </Container>

            <ScrollView>
              {Boolean(logToView?.access) && (
                <Container
                  width={75}
                  height={7}
                  verticalAlignment="center"
                  horizontalAlignment="space-between"
                  direction="row"
                >
                  <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Status:</Text>
                  <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, color: logToView?.access === 'REVOKE' ? 'red' : 'green' }}>
                    {logToView?.access === 'REVOKE' ? 'Denied' : 'Granted'}
                  </Text>
                </Container>
              )}

              {Boolean(logToView?.access_code) && (
                <Container
                  width={75}
                  height={7}
                  verticalAlignment="center"
                  horizontalAlignment="space-between"
                  direction="row"
                >
                  <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Access Code:</Text>
                  <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>{logToView?.access_code}</Text>
                </Container>
              )}

              {Boolean(logToView?.first_name) && (
                <Container
                  width={75}
                  height={7}
                  verticalAlignment="center"
                  horizontalAlignment="space-between"
                  direction="row"
                >
                  <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Guest Name:</Text>
                  <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>
                    {logToView?.first_name} {logToView?.last_name}
                  </Text>
                </Container>
              )}

              {Boolean(logToView?.access_type) && (
                <Container
                  width={75}
                  height={7}
                  verticalAlignment="center"
                  horizontalAlignment="space-between"
                  direction="row"
                >
                  <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Access Type:</Text>
                  <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>{logToView?.access_type}</Text>
                </Container>
              )}

              {Boolean(logToView?.category) && (
                <Container
                  width={75}
                  height={7}
                  verticalAlignment="center"
                  horizontalAlignment="space-between"
                  direction="row"
                >
                  <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Category:</Text>
                  <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>{logToView?.category}</Text>
                </Container>
              )}

              {Boolean(logToView?.vehicle_number) && (
                <Container
                  width={75}
                  height={7}
                  verticalAlignment="center"
                  horizontalAlignment="space-between"
                  direction="row"
                >
                  <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Vehicle Number:</Text>
                  <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>{logToView?.vehicle_number}</Text>
                </Container>
              )}

              {Boolean(logToView?.from_date) && (
                <Container
                  width={75}
                  height={7}
                  verticalAlignment="center"
                  horizontalAlignment="space-between"
                  direction="row"
                >
                  <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Arrival Date:</Text>
                  <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>{formattedDateToUse(logToView?.from_date)}</Text>
                </Container>
              )}

              {Boolean(logToView?.to_date) && (
                <Container
                  width={75}
                  height={7}
                  verticalAlignment="center"
                  horizontalAlignment="space-between"
                  direction="row"
                >
                  <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Departure Date:</Text>
                  <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>{formattedDateToUse(logToView?.to_date)}</Text>
                </Container>
              )}

              {Boolean(logToView?.gender) && (
                <Container
                  width={75}
                  height={7}
                  verticalAlignment="center"
                  horizontalAlignment="space-between"
                  direction="row"
                >
                  <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Gender:</Text>
                  <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>{logToView?.gender}</Text>
                </Container>
              )}

              {Boolean(logToView?.quantity) && (
                <Container
                  width={75}
                  height={7}
                  verticalAlignment="center"
                  horizontalAlignment="space-between"
                  direction="row"
                >
                  <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Quantity:</Text>
                  <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>{logToView?.quantity}</Text>
                </Container>
              )}

              {Boolean(logToView?.phone) && (
                <Container
                  width={75}
                  height={7}
                  verticalAlignment="center"
                  horizontalAlignment="space-between"
                  direction="row"
                >
                  <Text style={{ fontWeight: '500', color: '#616161', fontSize: 16, }}>Phone:</Text>
                  <Text style={{ fontWeight: '500', color: '#000', fontSize: 16, }}>{logToView?.phone}</Text>
                </Container>
              )}
            </ScrollView>


          </Container>
        </Container>
      </Modal>
    </Container>
  );
};
export default AccessLog;
