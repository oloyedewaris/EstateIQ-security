import { createStackNavigator } from "@react-navigation/stack";
import ReportAnIssue from "../screens/reportAnIssue";
import GenerateAccessCode from "../screens/generateAccessCode";
import ReportIssueFill from "../screens/reportIssueFill";
import AccessLog from "../screens/accessLog";
import Editprofile from "../screens/editProfile";
import Personalbio from "../screens/personalbio";
import Contactinfo from "../screens/contactinfo";
import Household from "../screens/household";
import RegisterDomestic from "../screens/registerdomesticmember";
import RegisterHouse from "../screens/registerHousemember";
import CardPayment from "../screens/cardpayment";
import CommunityDues from "../screens/communitydues";
import Electricity from "../screens/purchaseElectricity";
import Bills from "../screens/bills";
import PaymentsDetails from "../screens/paymentdetails";
import Transfer from "../screens/transfer";
import Paymentstransaction from "../screens/paymenttransaction";
import NUBAN from "../screens/nubanacct";
import CommunityLogs from "../screens/communitylogs";
import PrivateGenerateCode from "../screens/privateGenerateCode";
import WaybillGenerateCode from "../screens/waybillGenerateCode";
import BusinessGenerateCode from "../screens/businessGenerateCode";
import AccessCode from "../screens/accessCode";
import Vendor from "../screens/vendor";
import Groceries from "../screens/grocriess";
import Health from "../screens/health";
import Realestate from "../screens/realestate";
import Fashion from "../screens/fashion";
import Delivery from "../screens/delivery";
import Automobile from "../screens/automobile";
import Emergency from "../screens/emergency";
import ComunityDetails from "../screens/communitybillsdetails";
import Dashboard from "./Dashboard";
import SetEstate from "../screens/selectEstate";
import SetPassword from "../screens/setPassword";
import Notifications from "../screens/notifications";
import Verified from "../screens/verified";
import Logout from "../screens/onBoarding/logout";
import UserScreen from "../screens/user";


const HomeContainer = () => {
  const Stack = createStackNavigator<any>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="buttomTab" component={Dashboard} />
      <Stack.Screen name="AccessLog" component={AccessLog} />
      <Stack.Screen name="ReportIssueFill" component={ReportIssueFill} />
      <Stack.Screen name="GenerateAccessCode" component={GenerateAccessCode} />
      <Stack.Screen name="editprofile" component={Editprofile} />
      <Stack.Screen name="personalbio" component={Personalbio} />
      <Stack.Screen name="contactinfo" component={Contactinfo} />
      <Stack.Screen name="household" component={Household} />
      <Stack.Screen name="registerhouse" component={RegisterHouse} />
      <Stack.Screen name="registerdomestic" component={RegisterDomestic} />
      <Stack.Screen name="cardpayment" component={CardPayment} />
      <Stack.Screen name="communitydues" component={CommunityDues} />
      <Stack.Screen name="electricity" component={Electricity} />
      <Stack.Screen name="bills" component={Bills} />
      <Stack.Screen name="paymentdetails" component={PaymentsDetails} />
      <Stack.Screen name="transfer" component={Transfer} />
      <Stack.Screen name="paymenttransaction" component={Paymentstransaction} />
      <Stack.Screen name="nubanacct" component={NUBAN} />
      <Stack.Screen name="communitylogs" component={CommunityLogs} />
      <Stack.Screen name="PrivateGenerateCode" component={PrivateGenerateCode} />
      <Stack.Screen name="WaybillGenerateCode" component={WaybillGenerateCode} />
      <Stack.Screen name="BusinessGenerateCode" component={BusinessGenerateCode} />
      <Stack.Screen name="AccessCode" component={AccessCode} />
      <Stack.Screen name="vendor" component={Vendor} />
      <Stack.Screen name="groceries" component={Groceries} />
      <Stack.Screen name="health" component={Health} />
      <Stack.Screen name="realestate" component={Realestate} />
      <Stack.Screen name="fashion" component={Fashion} />
      <Stack.Screen name="delivery" component={Delivery} />
      <Stack.Screen name="automobile" component={Automobile} />
      <Stack.Screen name="emergency" component={Emergency} />
      <Stack.Screen name="communitybillsdetails" component={ComunityDetails} />
      <Stack.Screen name="changeEstate" component={SetEstate} />
      <Stack.Screen name="setPassword" component={SetPassword} />
      <Stack.Screen name="notifications" component={Notifications} />
      <Stack.Screen name="verified" component={Verified} />
      <Stack.Screen name="user" component={UserScreen} />
      <Stack.Screen name="logout" component={Logout} />
    </Stack.Navigator>
  )
}
//PassCheck
export default (HomeContainer);