import React, {useReducer} from 'react';
import {StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import {createBox} from '@shopify/restyle';
const Box = createBox();
import Dashbord from '../Dashboard/Dashboard';
import {Header} from '../ReusableComponents/index';
import {fonts, palette, size, TypographyStyles} from '../Theme/Index';
import Pending from '../Pending/Pending';

const Hamburger = require('../../assets/Hamburger/hamburger.png');
const History = props => {
  const {route} = props;
  let param = '';

  if (route && route.params !== undefined) {
    param = route.params.space;
  }

  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {},
  );

  return (
    <Box flex={1} backgroundColor="secondary1">
      <Header
        title="Job History"
        left={() => {
          return (
            <Image
              source={Hamburger}
              style={styles.image}
              height={30}
              width={30}
            />
          );
        }}
      />
      <Tab.Navigator
        initialRouteName="HOME"
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: palette.secondary6,
          inactiveBackgroundColor: palette.tertiary5,
          activeBackgroundColor: palette.primary,
          labelStyle: {
            position: 'absolute',
            top: 34 / 3,
            fontFamily: fonts.bold,
          },
          tabStyle: {
            borderRadius: 15,
            width: size.width / 3 - 20,
            height: 35,
            marginHorizontal: 5,
            borderWidth: 1,
            borderColor: palette.primary,
            alignSelf: 'center',
          },
          style: {
            position: 'absolute',
            top: 70,
            backgroundColor: 'transparent',
            paddingHorizontal: 10,
            height: 65,
            elevation: 0,
          },
        }}>
        <Tab.Screen
          name="HOME"
          component={Pending}
          initialParams={{}}
          options={({route}) => ({
            tabBarLabel: 'PENDING',
          })}
        />
        <Tab.Screen
          name="CHAT"
          component={Pending}
          initialParams={{}}
          options={({route}) => ({
            tabBarLabel: 'ON-GOING',
          })}
        />
        <Tab.Screen
          name="Postjob"
          component={Pending}
          initialParams={{
            space: param,
          }}
          options={({route}) => ({
            tabBarLabel: 'COMPLETED',
          })}
        />
      </Tab.Navigator>
    </Box>
  );
};

export default History;

const styles = StyleSheet.create({
  image: {marginLeft: 10, resizeMode: 'contain'},
});
