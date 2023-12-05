import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { Container, ImageWrap } from "../helper/index";
import { AppIcons } from "../helper/images";
import { AntDesign } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import InputCard from "../component/inputCard";
import { Colors } from "../helper/constants";
import LongButton from "../component/longbutton";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { createExitCodeApi } from "../api/accessCode";
import SelectDropdown from "../component/selectDropdown";
import * as Yup from 'yup'
import { ToastLong } from "../helper/toast";
import onShare from "../utils/share";
import { getUserEstateDetails } from "../api/user";
import { formatAMPM } from "../utils/formatDate";
import { useFocusEffect } from "@react-navigation/native";

const BusinessGenerateCode = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fetchedCode, setFetchedCode] = useState('');
  const [showArrival, setShowArrival] = useState(false);

  const userEstateDetail = useQuery(['getUserEstateDetails'], getUserEstateDetails)
  const userDetailsAddress = userEstateDetail?.data?.data?.address

  useFocusEffect(
    useCallback(() => {
      formik.setFieldValue('exit_date', new Date().toISOString());
    }, [])
  )

  const onChangeArrival = (selectedDate) => {
    const newISOFormat = new Date(selectedDate).toISOString()
    formik.setFieldValue('exit_date', newISOFormat);
    setShowArrival(false);
  };



  const Schema = Yup.object().shape({
    exit_type: Yup.string().required('Required'),
    full_name: Yup.string().required('Required'),
    // vehicle_number: Yup.string().required('Required'),
    exit_date: Yup.string().required('Required'),
  });

  const createCodeMutation = useMutation(createExitCodeApi,
    {
      onSuccess: res => {
        setModalVisible(true)
        setFetchedCode(res?.data?.access_code)
      },
      onError: (err) => {
        Alert.alert('An error occurred', JSON.stringify(err?.response?.data))
      }
    }
  )

  const formik = useFormik({
    initialValues: {
      exit_type: '',
      full_name: '',
      vehicle_number: '',
      exit_date: new Date().toISOString(),
    },
    validationSchema: Schema,
    onSubmit: values => {
      createCodeMutation.mutate(values)
    }
  })

  const formattedExitDate = `${new Date(formik.values.exit_date).toLocaleDateString()} ${formatAMPM(new Date(formik.values.exit_date))}`

  return (
    <Container flex={1} backgroundColor={"#FFFFFF"}>
      <ScrollView>
        <View
          style={{
            height: 620,
            width: "100%",
            backgroundColor: Colors.appPrimaryBlue,
          }}
        >
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
            <AntDesign name="left" size={15} color="white" />
            <Text style={{ color: "white", paddingLeft: 5 }}>Back</Text>
          </TouchableOpacity>
          <Container marginLeft={5} marginTop={2}>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
            >
              Generate Exit Pass
            </Text>
          </Container>
          <Container marginLeft={4} marginTop={2}>
            <Text style={{ color: "white", paddingLeft: 5 }}>
              Kindly fill this information
            </Text>
          </Container>
        </View>
        <View
          style={{
            height: 700,
            width: "95%",
            backgroundColor: "white",
            marginTop: "-129%",
            elevation: 10,
            marginLeft: "2.5%",
            borderRadius: 5,
          }}
        >
          <Container marginTop={1} marginLeft={5}>
            <SelectDropdown
              data={[
                { label: 'Vehicle', value: 'VEHICLE' },
                { label: 'Client', value: 'CLIENT' },
                { label: 'Pedestrian', value: 'PEDESTRIAN' },
                { label: 'Household items', value: 'HOUSEHOLD_ITEMS' },
              ]}

              error={(formik.errors.exit_type && formik.touched.exit_type) ? formik.errors.exit_type : ''}
              onChangeText={item => formik.handleChange('exit_type')(item?.value)}
              onBlur={formik.handleBlur('exit_type')}
              value={formik.values.exit_type}

              text={"Exit Type"}
              placeholder={"Select"}
            />
          </Container>
          <Container marginTop={1} marginLeft={5}>
            <InputCard
              error={(formik.errors.full_name && formik.touched.full_name) ? formik.errors.full_name : ''}
              onChangeText={formik.handleChange('full_name')}
              onBlur={formik.handleBlur('full_name')}
              value={formik.values.full_name}

              text={"Full Name"}
              placeholder={"(Guest)"}
            />
          </Container>
          <Container marginTop={1} marginLeft={5}>
            <InputCard
              error={(formik.errors.vehicle_number && formik.touched.vehicle_number) ? formik.errors.vehicle_number : ''}
              onChangeText={formik.handleChange('vehicle_number')}
              onBlur={formik.handleBlur('vehicle_number')}
              value={formik.values.vehicle_number}

              text={"Vehicle Number"}
              placeholder={"Vehicle plate number"}
            />
          </Container>

          <TouchableOpacity onPress={() => setShowArrival(true)}>
            <Container marginTop={1} marginLeft={5}>
              <InputCard
                editable={false} selectTextOnFocus={false}
                error={(formik.errors.exit_date && formik.touched.exit_date) ? formik.errors.exit_date : ''}
                onChangeText={formik.handleChange('exit_date')}
                onBlur={formik.handleBlur('exit_date')}
                value={formik.values.exit_date && formattedExitDate}

                text={"Expiry Date and Time"}
                placeholder={"DD/MM/YYYY"}
              />
            </Container>
          </TouchableOpacity>


          <DateTimePickerModal
            minimumDate={new Date()}
            isVisible={showArrival}
            mode="datetime"
            onCancel={() => setShowArrival(false)}
            onConfirm={onChangeArrival}
          />

          <Container marginTop={5} horizontalAlignment="center">
            <LongButton
              isLoading={createCodeMutation.isLoading}
              text={"Generate"}
              onPress={formik.handleSubmit}
            />
          </Container>
        </View>
      </ScrollView>

      <Modal onRequestClose={() => setModalVisible(false)} animationType="slide" visible={modalVisible} transparent>
        <Container
          flex={1}
          verticalAlignment="center"
          horizontalAlignment="center"
          backgroundColor={"rgba(0, 0, 0, 0.7)"}
        >
          <Container
            height={35}
            width={90}
            verticalAlignment="center"
            horizontalAlignment="center"
            backgroundColor={"white"}
            borderRadius={10}
          >
            <Container width={90} direction="row">
              <Container width={70}></Container>

              <Container
                width={20}
                verticalAlignment="center"
                horizontalAlignment="center"
                paddingVertical={1}
                marginTop={-7}
                paddingLeft={4}
              >
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <AntDesign name="close" size={25} color="black" />
                </TouchableOpacity>
              </Container>
            </Container>
            <Container width={90} direction="row" marginTop={-1}>
              <Container
                width={90}
                verticalAlignment="center"
                horizontalAlignment="center"
              >
                <Text
                  style={{
                    color: Colors.appPrimaryBlue,
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Exit Passcode
                </Text>
              </Container>
            </Container>

            <Container
              marginTop={2}
              width={90}
              horizontalAlignment="center"
              verticalAlignment="center"
              direction="row"
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 26,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {fetchedCode}
              </Text>
              <Container height={3} width={10}>
                <ImageWrap source={AppIcons.hands} fit="contain" />
              </Container>
            </Container>

            <Container
              marginTop={4}
              width={90}
              verticalAlignment="center"
              horizontalAlignment="center"
            >
              <LongButton
                onPress={() => {
                  onShare(`
Hi ${formik.values?.full_name},

Your one-time code is 

${fetchedCode}

Address : ${userDetailsAddress},

on ${formattedExitDate}

Powered by: www.estateiq.ng 
`);
                  props.navigation.goBack();
                }}
                text={"Share"} width={50} np={50} />
            </Container>
          </Container>
        </Container>
      </Modal>
    </Container>
  );
};
export default BusinessGenerateCode;
