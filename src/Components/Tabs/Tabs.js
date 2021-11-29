import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  DashboardStack,
  PostJobStack,
  SettingsStack,
  HistoryStack,
} from '../../Navigation/DashboardNavigation';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import MyTabBar from './CustomTabs';
const Tab = createBottomTabNavigator();
import {createBox} from '@shopify/restyle';
import ComingSoon from '../ComingSoon/ComingSoon';
const Box = createBox();

const TabContainer = props => {
  const {route} = props;
  let param = '';

  if (route && route.params !== undefined) {
    param = route.params.space;
  }

  /**
   * @function setTabVisible
   * @param {*} route
   * @returns boolean.
   */
  const setTabVisible = route => {
    const routeName = getFocusedRouteNameFromRoute(route);
    switch (routeName) {
      case 'ContractorProfile':
        return false;
      case 'PostJobDetail':
        return false;
      case 'JobTarget':
        return false;
      case 'SelectLocation':
        return false;
      case 'Search':
        return false;
      case 'Shops':
        return false;
      case 'ReviewList':
        return false;
      case 'Profile':
        return false;
      case 'NearbyContractor':
        return false;
      case 'JobSummary':
        return false;
      case 'AuthSuccess':
        return false;

      default:
        return true;
    }
  };
  return (
    <Box flex={1} backgroundColor="white">
      <Tab.Navigator
        initialRouteName="HOME"
        tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen
          name="HOME"
          component={ComingSoon}
          initialParams={{}}
          options={({route}) => ({
            tabBarVisible: setTabVisible(route),
            tabBarLabel: 'HOME',
          })}
        />
        <Tab.Screen
          name="CHAT"
          component={ComingSoon}
          initialParams={{}}
          options={({route}) => ({
            tabBarVisible: setTabVisible(route),
            tabBarLabel: 'CHAT',
          })}
        />
        <Tab.Screen
          name="Postjob"
          component={PostJobStack}
          initialParams={{
            space: param,
          }}
          options={({route}) => ({
            tabBarVisible: setTabVisible(route),
            tabBarLabel: 'POST JOB',
          })}
        />
        <Tab.Screen
          name="HISTORY"
          component={HistoryStack}
          initialParams={{
            space: param,
          }}
          options={({route}) => ({
            tabBarVisible: setTabVisible(route),
            tabBarLabel: 'BOOKING',
          })}
        />
        <Tab.Screen
          name="SETTINGS"
          component={SettingsStack}
          initialParams={{
            space: param,
          }}
          options={({route}) => ({
            tabBarVisible: setTabVisible(route),
            tabBarLabel: 'SETTINGS',
          })}
        />
      </Tab.Navigator>
    </Box>
  );
};
export default TabContainer;
