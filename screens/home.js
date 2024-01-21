import {
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Container, ImageWrap, TouchWrap } from "../helper/index";
import { AppIcons } from "../helper/images";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Colors } from "../helper/constants";
import { useMutation, useQuery } from "react-query";
import { getUserEstateDetails, getUserEstateDetailsByEstateIdAndEmail } from "../api/user";
import LongButton from "../component/longbutton";
import { useFormik } from "formik";
import { getAccessLogs, verifyAccessLog } from "../api/accessCode";
import * as Yup from 'yup';
import { TextInput } from "react-native-gesture-handler";
import { logout } from "../context/actions/auth";
import { GlobalContext } from "../context/Provider";
import { handleBackendError } from "../utils/errors";
import { useFocusEffect } from "@react-navigation/native";

const Home = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUserVisible, setModalUserVisible] = useState(false);
  const { authDispatch } = useContext(GlobalContext)
  let userQueryVar = 'start'

  const userDetailsQuery = useQuery(['getUserEstateDetails', userQueryVar], getUserEstateDetails)
  const profile = userDetailsQuery?.data?.data;

  const accessQuery = useQuery(['getAccessLogs', '', ''], () => getAccessLogs('', ''));
  const logsData = accessQuery?.data?.data?.results

  const totalLog = logsData?.length
  const deniedLog = logsData?.filter(log => log.access === 'REVOKE')?.length
  const grantLog = logsData?.filter(log => log.access === 'GRANT')?.length

  const profileData = profile?.estate_user?.user;
  const userId = profile?.estate_user?.estate_user_id;
  const profile_image = profile?.estate_user?.profile_image;

  const keyboardVerticalOffset = Platform.OS === "ios" ? 150 : 0;

  const SchemaAccess = Yup.object().shape({
    access_code: Yup.string().required('Required'),
  });

  const SchemaUser = Yup.object().shape({
    user: Yup.string().required('Required'),
    estate: Yup.string().required('Required'),
  });

  const accessformik = useFormik({
    initialValues: {
      access_code: '',
    },
    validationSchema: SchemaAccess,
    onSubmit: values => {
      verifyMutation.mutate(values)
    }
  })

  const userformik = useFormik({
    initialValues: {
      user: '',
      estate: ''
    },
    validationSchema: SchemaUser,
    onSubmit: values => {
      verifyUserMutation.mutate({
        estate_id: values.estate,
        email: values.user
      })
    }
  })


  useFocusEffect(
    useCallback(() => {
      accessQuery.refetch();

      return () => {
        setModalVisible(false);
        setModalUserVisible(false)
        accessformik.setFieldValue('access_code', '');
        userformik.setFieldValue('user', '');
        userformik.setFieldValue('estate', '');
        userQueryVar = 'end'
      }
    }, [])
  )


  useEffect(() => {
    console.log('profile?.estate_user?.user_type', profile?.estate_user?.user_type)
    if (profile?.estate_user && (profile?.estate_user?.user_type !== 'SECURITY' && profile?.estate_user?.user_type !== 'EXTERNAL')) {
      Alert.alert('Authentication error', 'This is a resident account. Please use the resident app for this account', [{
        text: 'OK',
        onPress: () => logout()(authDispatch)
      }])
    }
  }, [profile?.estate_user])


  const verifyMutation = useMutation(verifyAccessLog, {
    onSuccess: res => {
      accessformik.setFieldValue('access_code', '')
      if (res?.data?.error) {
        setModalVisible(false)
        return Alert.alert('An error occurred', handleBackendError(res?.data))
      }
      props.navigation.navigate('verified', { data: res?.data })
    },
    onError: err => {
      Alert.alert('An error occurred', handleBackendError(err?.response?.data));
    }
  });

  const verifyUserMutation = useMutation(getUserEstateDetailsByEstateIdAndEmail, {
    onSuccess: res => {
      userformik.setFieldValue('user', '')
      userformik.setFieldValue('estate', '')
      if (res?.data?.error) {
        setModalUserVisible(false)
        return Alert.alert('An error occurred', handleBackendError(res?.data))
      }
      props.navigation.navigate('user', { data: res?.data })
    },
    onError: err => {
      Alert.alert('An error occurred', handleBackendError(err?.response?.data));
    }
  })

  return (
    <Container flex={1} backgroundColor={"#FFFFFF"}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <ScrollView>
          <TouchableOpacity onPress={() => props.navigation.navigate('Settings')}>
            <Container
              height={20}
              width={100}
              backgroundColor={Colors.appPrimaryBlue} direction="row"
            >
              <Container
                width={27}
                height={10}
                borderRadius={50}
                marginTop={7}
                marginLeft={5}
              >
                {profile_image ? (
                  <Image
                    style={{ marginLeft: 10, width: 70, height: 70, borderRadius: 100 }}
                    source={{ uri: `https://api.estateiq.ng/${profile_image}` }}
                    fit="contain"
                  />
                ) : (
                  <ImageWrap source={AppIcons.avatar} fit="contain" />
                )}
              </Container>
              <Container width={50} height={10} marginTop={7} marginLeft={2}>
                <Container width={50} height={5} verticalAlignment="center" >
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                    Welcome, {profileData?.first_name} {profileData?.last_name}
                  </Text>
                </Container>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                  {userId}
                </Text>
              </Container>
            </Container>
          </TouchableOpacity>

          <Container marginTop={9} width={100} height={23} direction="row">
            <TouchWrap>
              <Container
                elevation={5}
                height={18}
                width={43}
                backgroundColor={"#FFFFFF"}
                marginLeft={5}
                borderRadius={5}
                borderColor={"#E0E0E0"}
                borderWidth={1}
              >
                <Container height={8} width={20} marginTop={2}>
                  <ImageWrap source={AppIcons.pending} fit="contain" />
                </Container>
                <Container marginLeft={3} marginTop={1}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>
                    Pending
                  </Text>
                </Container>
                <Container marginLeft={3}>
                  <Text style={{ fontSize: 16, color: 'black' }}>
                    0
                  </Text>
                </Container>
              </Container>
            </TouchWrap>
            <TouchWrap>
              <Container
                elevation={5}
                height={18}
                width={43}
                backgroundColor={"#FFFFFF"}
                marginLeft={5}
                borderRadius={5}
                borderColor={"#E0E0E0"}
                borderWidth={1}
              >
                <Container height={8} width={20} marginTop={2}>
                  <ImageWrap source={AppIcons.warning} fit="contain" />
                </Container>
                <Container marginLeft={3} marginTop={1}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.appPrimaryBlue }}>
                    Declined
                  </Text>
                </Container>
                <Container marginLeft={3}>
                  <Text style={{ fontSize: 16, color: 'black' }}>
                    {deniedLog}
                  </Text>
                </Container>
              </Container>
            </TouchWrap>
          </Container>
          <Container width={100} height={23} direction="row">
            <TouchWrap>
              <Container
                elevation={5}
                height={18}
                width={43}
                backgroundColor={"#FFFFFF"}
                marginLeft={5}
                borderRadius={5}
                borderColor={"#E0E0E0"}
                borderWidth={1}
              >
                <Container height={8} width={20} marginTop={2}>
                  <ImageWrap source={AppIcons.noted} fit="contain" />
                </Container>
                <Container marginLeft={3} marginTop={1}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>
                    Granted
                  </Text>
                </Container>
                <Container marginLeft={3}>
                  <Text style={{ fontSize: 16, color: 'black' }}>
                    {grantLog}
                  </Text>
                </Container>
              </Container>
            </TouchWrap>
            <TouchWrap>
              <Container
                elevation={5}
                height={18}
                width={43}
                backgroundColor={"#FFFFFF"}
                marginLeft={5}
                borderRadius={5}
                borderColor={"#E0E0E0"}
                borderWidth={1}
              >
                <Container height={8} width={20} marginTop={2}>
                  <ImageWrap source={AppIcons.homeCheck} fit="contain" />
                </Container>
                <Container marginLeft={3} marginTop={1}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>
                    Total
                  </Text>
                </Container>
                <Container marginLeft={3}>
                  <Text style={{ fontSize: 16, color: 'black' }}>
                    {totalLog}
                  </Text>
                </Container>
              </Container>
            </TouchWrap>
          </Container>
          <Container horizontalAlignment="center" marginTop={1}>
            <LongButton
              onPress={() => setModalVisible(true)}
              text={'Verify Access Code'}
            />
          </Container>
          <Container horizontalAlignment="center" marginTop={1}>
            <LongButton
              onPress={() => setModalUserVisible(true)}
              text={'Verify User'}
            />
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal onRequestClose={() => setModalVisible(false)} animationType="slide" visible={modalVisible} transparent>
        <Container
          flex={1}
          verticalAlignment="center"
          horizontalAlignment="center"
          backgroundColor={"rgba(0, 0, 0, 0.7)"}
        >
          <Container
            height={37}
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
            <Container width={90} direction="row">
              <Container
                width={90}
                verticalAlignment="center"
                horizontalAlignment="center"
              >
                <Text
                  style={{
                    color: Colors.appBlack,
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                >
                  Input Code
                </Text>
              </Container>
            </Container>

            <Container width={75}>
              <Container>
                <Text style={{ textAlign: 'center', marginTop: 4, color: '#9E9E9E' }}>(Access & Exit/Waybill/Staff ID)</Text>
              </Container>
              <TextInput
                onChangeText={accessformik.handleChange('access_code')}
                onBlur={accessformik.handleBlur('access_code')}
                value={accessformik.values.access_code}
                placeholder={'Enter access code'}
                style={{
                  height: 45,
                  width: "100%",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 2,
                  paddingLeft: 10,
                  borderColor: (accessformik.errors.access_code && accessformik.touched.access_code) ? "#D00000" : "#D9D9D9",
                  borderWidth: 1,
                  marginTop: 15
                }}
                keyboardType="number-pad"
              />
            </Container>

            <Container
              marginTop={4}
              width={90}
              verticalAlignment="center"
              horizontalAlignment="center"
            >
              <LongButton
                isLoading={verifyMutation.isLoading}
                text={"Verify"}
                width={50}
                np={50}
                onPress={accessformik.handleSubmit}
              />
            </Container>
          </Container>
        </Container>
      </Modal>

      <Modal onRequestClose={() => setModalUserVisible(false)} animationType="slide" visible={modalUserVisible} transparent>
        <Container
          flex={1}
          verticalAlignment="center"
          horizontalAlignment="center"
          backgroundColor={"rgba(0, 0, 0, 0.7)"}
        >
          <Container
            height={47}
            width={90}
            verticalAlignment="center"
            horizontalAlignment="center"
            backgroundColor={"white"}
            borderRadius={10}
          >
            <Container width={10} marginLeft={70}>
              <TouchWrap onPress={() => setModalUserVisible(false)}>
                <AntDesign name="close" size={24} color="black" />
              </TouchWrap>
            </Container>
            <Container width={90} direction="row">
              <Container
                width={90}
                verticalAlignment="center"
                horizontalAlignment="center"
              >
                <Text
                  style={{
                    color: Colors.appBlack,
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                >
                  User Details
                </Text>
              </Container>
            </Container>

            <Container width={75}>
              <Container>
                <Text style={{ textAlign: 'center', marginTop: 30, color: '#9E9E9E' }}>User email</Text>
              </Container>
              <TextInput
                onChangeText={userformik.handleChange('user')}
                onBlur={userformik.handleBlur('user')}
                value={userformik.values.user}
                placeholder={'Enter user email'}
                style={{
                  height: 45,
                  width: "100%",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 2,
                  paddingLeft: 10,
                  borderColor: (userformik.errors.user && userformik.touched.user) ? "#D00000" : "#D9D9D9",
                  borderWidth: 1,
                  marginTop: 15
                }}
              // keyboardType="number-pad"
              />
            </Container>

            <Container width={75}>
              <Container>
                <Text style={{ textAlign: 'center', marginTop: 30, color: '#9E9E9E' }}>Estate ID</Text>
              </Container>
              <TextInput
                onChangeText={userformik.handleChange('estate')}
                onBlur={userformik.handleBlur('estate')}
                value={userformik.values.estate}
                placeholder={'Enter estate ID'}
                style={{
                  height: 45,
                  width: "100%",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 2,
                  paddingLeft: 10,
                  borderColor: (userformik.errors.estate && userformik.touched.estate) ? "#D00000" : "#D9D9D9",
                  borderWidth: 1,
                  marginTop: 15
                }}
              // keyboardType="number-pad"
              />
            </Container>

            <Container
              marginTop={4}
              width={90}
              verticalAlignment="center"
              horizontalAlignment="center"
            >
              <LongButton
                isLoading={verifyUserMutation.isLoading}
                text={"Verify"}
                width={50}
                np={50}
                onPress={userformik.handleSubmit}
              />
            </Container>
          </Container>
        </Container>
      </Modal>

    </Container>
  );
};
export default Home;
