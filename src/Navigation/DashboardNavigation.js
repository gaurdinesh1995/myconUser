import React from 'react';
import {Platform, BackHandler, useWindowDimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Drawerr from '../Components/Drawer/Drawer';
import {navigationRef} from './RootNavigation';
import Dashboard from '../Components/Dashboard/Dashboard';
import Tabs from '../Components/Tabs/Tabs';
import PostAJob from '../Components/PostJob/PostAJob';
import JobSelectDate from '../Components/PostJob/JobSelectDate';
import LocationSelection from '../Components/LocationSelection/LocationSelection';
import Settings from '../Components/Settings/Settings';
import PostAJobdetails from '../Components/PostJob/PostAJobdetails';
import JobSummary from '../Components/JobSummary/JobSummary';
import AllJobCategory from '../Components/JobCategory/AllJobCategory';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import ContractorProfile from '../Components/ContractorProfile/ContractorProfile';
import GoogleMapAutoSearch from '../Components/GoogleMap/GoogleMapAutoSearch';
import Profile from '../Components/Profile/Profile';
import NearbyContractor from '../Components/NearbyContractor/NearbyContractor';
import History from '../Components/History/History';
import JobComplete from '../Components/JobComplete/JobComplete';
import MatchingContractor from '../Components/MatchingContractor/MatchingContractor';
import AppliedContractor from '../Components/AppliedContractor/AppliedContractor';
import VerifyPhoneNumber from '../Components/Authentication/VerifyPhoneNumber/VerifyPhoneNumber';
import SurveyOne from '../Components/Survey/SurveyOne';
import SurveyTwo from '../Components/Survey/SurveyTwo';
import SurveyThree from '../Components/Survey/SurveyThree';
import SurveyFour from '../Components/Survey/SurveyFour';
import AuthSuccess from '../Components/Authentication/AuthSuccess/AuthSuccess';
import ComingSoon from '../Components/ComingSoon/ComingSoon';
import Login from '../Components/topokki/Login';
const Stack = createStackNavigator();
const Shared = createSharedElementStackNavigator();

function backButtonHandler() {
  return true;
}
BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
const options = {
  headerBackTitleVisible: false,
  cardStyleInterpolator: ({current: {progress}}) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};
function TabsStack() {
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
      initialRouteName="tab"
      headerMode={'none'}
      screenOptions={
        Platform.OS === 'ios'
          ? {headerShown: false, gestureEnabled: false}
          : {headerShown: false}
      }>
      <Stack.Screen
        name="tab"
        component={Tabs}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />
    </Stack.Navigator>
  );
}
export const DashboardStack = () => {
  const insets = useSafeAreaInsets();
  return (
    <Shared.Navigator
      initialRouteName="Dashboard"
      headerMode={'none'}
      screenOptions={
        Platform.OS === 'ios'
          ? {headerShown: false, gestureEnabled: false}
          : {headerShown: false}
      }>
      <Shared.Screen name="Dashboard" component={Dashboard} />
      <Shared.Screen
        name="ContractorProfile"
        options={() => options}
        component={ContractorProfile}
      />
      <Shared.Screen name="NearbyContractor" component={NearbyContractor} />
      <Shared.Screen name="JobComplete" component={JobComplete} />
    </Shared.Navigator>
  );
};

export const SettingsStack = () => {
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      headerMode={'none'}
      screenOptions={
        Platform.OS === 'ios'
          ? {headerShown: false, gestureEnabled: false}
          : {headerShown: false}
      }>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Verify" component={VerifyPhoneNumber} />
      <Stack.Screen
        name="AuthSuccess"
        component={AuthSuccess}
        options={{
          headerShown: false,
          transparentCard: true,
          cardStyle: {opacity: 1},
        }}
        initialParams={{space: insets}}
      />
      <Stack.Screen name="SurveyO" component={SurveyOne} />
      <Stack.Screen name="SurveyT" component={SurveyTwo} />
      <Stack.Screen name="SurveyTh" component={SurveyThree} />
      <Stack.Screen name="SurveyF" component={SurveyFour} />
      <Stack.Screen name="ComingSoon" component={ComingSoon} />
    </Stack.Navigator>
  );
};

export const HistoryStack = () => {
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
      initialRouteName="ComingSoon"
      headerMode={'none'}
      screenOptions={
        Platform.OS === 'ios'
          ? {headerShown: false, gestureEnabled: false}
          : {headerShown: false}
      }>
      <Stack.Screen name="ComingSoon" component={ComingSoon} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="MatchingContractor" component={MatchingContractor} />
      <Stack.Screen name="AppliedContractor" component={AppliedContractor} />
    </Stack.Navigator>
  );
};

export const PostJobStack = () => {
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
      initialRouteName="Postjob"
      headerMode={'none'}
      screenOptions={
        Platform.OS === 'ios'
          ? {headerShown: false, gestureEnabled: false}
          : {headerShown: false}
      }>
      <Stack.Screen name="Postjob" component={PostAJob} />
      <Stack.Screen name="PostJobDetail" component={PostAJobdetails} />
      <Stack.Screen name="JobTarget" component={JobSelectDate} />
      <Stack.Screen name="SelectLocation" component={LocationSelection} />
      <Stack.Screen name="JobSummary" component={JobSummary} />
      <Stack.Screen
        name="JobCategory"
        options={() => options}
        component={AllJobCategory}
      />
      <Stack.Screen name="Search" component={GoogleMapAutoSearch} />
      <Stack.Screen name="ComingSoon" component={ComingSoon} />
    </Stack.Navigator>
  );
};

export default () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <TabsStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
