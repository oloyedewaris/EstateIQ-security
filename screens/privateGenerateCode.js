import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { Container, ImageWrap, TouchWrap } from "../helper/index";
import { AppIcons } from "../helper/images";
import { AntDesign } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import InputCard from "../component/inputCard";
import { Colors } from "../helper/constants";
import LongButton from "../component/longbutton";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { createPrivateCodeApi } from "../api/accessCode";
import * as Yup from 'yup';
import SelectDropdown from "../component/selectDropdown";
import onShare from "../utils/share";
import { getUserEstateDetails } from "../api/user";
import { formatAMPM } from "../utils/formatDate";
import { useFocusEffect } from "@react-navigation/native";

const PrivateGenerateCode = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fetchedCode, setFetchedCode] = useState('');
  const [showArrival, setShowArrival] = useState(false);
  const [showDeparture, setShowDeparture] = useState(false);

  const userEstateDetail = useQuery(['getUserEstateDetails'], getUserEstateDetails)
  const userDetailsAddress = userEstateDetail?.data?.data?.address

  useFocusEffect(
    useCallback(() => {
      formik.setFieldValue('from_date', new Date().toISOString());
      formik.setFieldValue('to_date', new Date().toISOString());
    }, [])
  )


  const onChangeArrival = (selectedDate) => {
    const newISOFormat = new Date(selectedDate).toISOString()
    formik.setFieldValue('from_date', newISOFormat);
    setShowArrival(false);
  };

  const onChangeDeparture = (selectedDate) => {
    const newISOFormat = new Date(selectedDate).toISOString()
    formik.setFieldValue('to_date', newISOFormat);
    setShowDeparture(false);
  };



  const Schema = Yup.object().shape({
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
    from_date: Yup.string().required('Required'),
    to_date: Yup.string().required('Required'),
    access_type: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
  });

  const createCodeMutation = useMutation(createPrivateCodeApi,
    {
      onSuccess: res => {
        setModalVisible(true)
        setFetchedCode(res?.data?.access_code)
        formik.resetForm()
      },
      onError: (err) => {
        Alert.alert('An error occurred', JSON.stringify(err?.response?.data))
      }
    }
  )

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address: '',
      from_date: new Date().toISOString(),
      to_date: new Date().toISOString(),
      access_type: '',
      category: '',
    },
    validationSchema: Schema,
    onSubmit: values => {
      createCodeMutation.mutate(values)
    }
  })

  const formattedToDate = `${new Date(formik.values.to_date).toLocaleDateString()} ${formatAMPM(new Date(formik.values.to_date))}`
  const formattedFromDate = `${new Date(formik.values.from_date).toLocaleDateString()} ${formatAMPM(new Date(formik.values.from_date))}`

  return (
    <Container flex={1} backgroundColor={"#FFFFFF"}>
      {/* <KeyboardAvoidingView
        behavior="height"
        keyboardVerticalOffset={keyboardVerticalOffset}
      > */}
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
              Generate Access code
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
            <InputCard
              error={(formik.errors.first_name && formik.touched.first_name) ? formik.errors.first_name : ''}
              onChangeText={formik.handleChange('first_name')}
              onBlur={formik.handleBlur('first_name')}
              value={formik.values.first_name}

              text={"First Name"}
              placeholder={"(Guest)"}
            />
          </Container>
          <Container marginTop={1} marginLeft={5}>
            <InputCard
              error={(formik.errors.last_name && formik.touched.last_name) ? formik.errors.last_name : ''}
              onChangeText={formik.handleChange('last_name')}
              onBlur={formik.handleBlur('last_name')}
              value={formik.values.last_name}

              text={"Last Name"}
              placeholder={"(Guest)"}
            />
          </Container>
          <Container marginTop={1} marginLeft={5}>
            <SelectDropdown
              data={[
                { label: 'One Time', value: 'ONE_TIME' },
                { label: 'Permanent', value: 'PERMANENT' }
              ]}
              error={(formik.errors.access_type && formik.touched.access_type) ? formik.errors.access_type : ''}
              onChangeText={item => formik.handleChange('access_type')(item?.value)}
              onBlur={formik.handleBlur('access_type')}
              value={formik.values.access_type}

              text={"Access Type"}
              placeholder={"Select"}
            />
          </Container>

          <Container marginTop={1} marginLeft={5}>
            <SelectDropdown
              data={[
                { label: 'Visitor', value: 'VISITOR' },
                { label: 'Artisan', value: 'ARTISAN' },
                { label: 'Taxi', value: 'TAXI' },
                { label: 'Delivery', value: 'DELIVERY' },
                { label: 'Event', value: 'EVENT' },
                { label: 'Others', value: 'OTHERS' }
              ]}
              error={(formik.errors.category && formik.touched.category) ? formik.errors.category : ''}
              onChangeText={item => formik.handleChange('category')(item?.value)}
              onBlur={formik.handleBlur('category')}
              value={formik.values.category}

              text={"Guest Type"}
              placeholder={"Select"}
            />
          </Container>

          <TouchableOpacity onPress={() => setShowArrival(true)}>
            <Container marginTop={1} marginLeft={5}>
              <InputCard
                editable={false} selectTextOnFocus={false}
                error={(formik.errors.from_date && formik.touched.from_date) ? formik.errors.from_date : ''}
                onChangeText={formik.handleChange('from_date')}
                onBlur={formik.handleBlur('from_date')}
                value={formik.values.to_date && formattedFromDate}

                text={"Arrival Date and Time"}
                placeholder={"DD/MM/YYYY"}
              />
            </Container>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowDeparture(true)}>
            <Container marginTop={1} marginLeft={5}>
              <InputCard
                editable={false} selectTextOnFocus={false}
                error={(formik.errors.to_date && formik.touched.to_date) ? formik.errors.to_date : ''}
                onChangeText={formik.handleChange('to_date')}
                onBlur={formik.handleBlur('to_date')}
                value={formik.values.to_date && formattedToDate}

                text={"Departure Date and Time"}
                placeholder={"DD/MM/YYYY:TT"}
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
          <DateTimePickerModal
            minimumDate={new Date()}
            isVisible={showDeparture}
            mode="datetime"
            onCancel={() => setShowDeparture(false)}
            onConfirm={onChangeDeparture}
          />

          <Container marginTop={5} horizontalAlignment="center">
            <LongButton
              text={"Generate"}
              isLoading={createCodeMutation.isLoading}
              onPress={() => formik.handleSubmit()}
            />
          </Container>
        </View>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}

      <Modal animationType="slide" visible={modalVisible} transparent>
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
            <Container width={10} marginLeft={70}>
              <TouchWrap onPress={() => setModalVisible(false)}>
                <AntDesign name="close" size={24} color="black" />
              </TouchWrap>
            </Container>
            <Container width={90} direction="row" marginTop={3}>
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
                  Access Code
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
                text={"Share"}
                width={50}
                np={50}
                onPress={() => {
                  onShare(`
Hi ${formik.values?.first_name} ${formik.values?.last_name},

Your one-time code is 

${fetchedCode}

Address : ${userDetailsAddress},

from ${formattedFromDate} to ${formattedFromDate}

Powered by: www.estateiq.ng 
`);
                  props.navigation.goBack()
                }}
              />
            </Container>
          </Container>
        </Container>
      </Modal>
    </Container>
  );
};
export default PrivateGenerateCode;
