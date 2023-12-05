import { StatusBar } from "expo-status-bar";
import {
  Text,
  TouchableOpacity,
} from "react-native";
import { Container } from "../helper/index";
import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "react-query";
import { fetchNotifications } from "../api/notifications";

const Notifications = (props) => {
  const notificationQuery = useQuery(['fetchNotifications'], fetchNotifications)

  return (
    <Container flex={1} backgroundColor={"#FFFFFF"}>
      <Container
        height={60}
        width={100}
      >
        <TouchableOpacity
          style={{
            marginTop: "10%",
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
        <Container marginLeft={5} marginTop={3}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "black" }}>
            Notifications
          </Text>
        </Container>
      </Container>
      <StatusBar style="auto" />
    </Container>
  );
};
export default Notifications;
