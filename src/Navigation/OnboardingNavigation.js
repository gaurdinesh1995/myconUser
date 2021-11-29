import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './RootNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Login from '../Components/Authentication/Login/Login';
import Signup from '../Components/Authentication/Signup/Singup';
import PasswordRecovery from '../Components/Authentication/PasswordRecovery/PasswordRecovery';
import ResetPassword from '../Components/Authentication/ResetPassword/ResetPassword';
import AuthSuccess from '../Components/Authentication/AuthSuccess/AuthSuccess';
import Verify from '../Components/Authentication/VerifyPhoneNumber/VerifyPhoneNumber';
const Stack = createStackNavigator();

export const ModalStack = () => {
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      headerMode="none"
      mode="modal"
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({current: {progress}}) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: 'clamp',
            }),
          },
        }),
      }}>
      <Stack.Screen
        name="Auth"
        component={AuthStack}
        options={{headerShown: false}}
        initialParams={{space: insets}}
      />
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
    </Stack.Navigator>
  );
};

export const AuthStack = () => {
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator headerMode="none" initialRouteName={'Welcome'}>
      <>
        <Stack.Screen
          name="Login"
          initialParams={{space: insets}}
          component={Login}
        />
        <Stack.Screen
          name="Signup"
          initialParams={{space: insets}}
          component={Signup}
        />
        <Stack.Screen
          name="Verify"
          initialParams={{space: insets}}
          component={Verify}
        />
        <Stack.Screen
          name="PasswordRecovery"
          initialParams={{space: insets}}
          component={PasswordRecovery}
        />
        <Stack.Screen
          name="ResetPassword"
          initialParams={{space: insets}}
          component={ResetPassword}
        />
      </>
    </Stack.Navigator>
  );
};

export default () => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <ModalStack />
      </NavigationContainer>
    </>
  );
};
