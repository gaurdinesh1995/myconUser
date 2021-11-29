import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import {createBox, createText} from '@shopify/restyle';
import {fonts, palette, TypographyStyles} from '../Theme/Index';
import {normalize} from '../Helpers/utils';
const home = require('../../assets/Tabs/Home.png');
const booking = require('../../assets/Tabs/booking.png');
const chat = require('../../assets/Tabs/chat.png');
const job = require('../../assets/Tabs/job.png');
const settings = require('../../assets/Tabs/setting.png');
const Box = createBox();
const Text = createText();

const MyTabBar = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  /**
   * @function tabBarIcon
   * @param {} focused
   * @param {*} label
   * @param {*} selectedLabel
   * @returns it will set icons in selected and unselected view.
   */
  const tabBarIcon = (focused, label, selectedLabel) => {
    let iconSelected = '';
    let name = '';
    let lname = '';
    let fname = '';
    if (selectedLabel !== '') {
      fname = selectedLabel;
    }
    if (label === 'HOME') {
      lname = label;
      name = home;
      iconSelected = home;
    } else if (label === 'CHAT') {
      lname = label;
      name = chat;
      iconSelected = chat;
    } else if (label === 'BOOKING') {
      lname = label;
      name = booking;
      iconSelected = booking;
    } else if (label === 'SETTINGS') {
      lname = label;
      name = settings;
      iconSelected = settings;
    }
    return (
      <>
        {focused ? (
          <View style={style.focusedView}>
            <Image source={iconSelected} style={style.focusedImage} />
            <Text style={style.foucsedText}>{fname}</Text>
          </View>
        ) : (
          <View style={style.focusedView}>
            <Image source={name} style={style.notFocusedImage} />
            <Text style={style.textUnfoucsed}>{lname}</Text>
          </View>
        )}
      </>
    );
  };

  return (
    <Box
      flexDirection="row"
      height={80}
      alignItems="center"
      backgroundColor="primary2"
      style={TypographyStyles.cardShadow}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        let selectedLabel = '';
        if (state.index === index) {
          selectedLabel =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Box
            flex={1}
            backgroundColor="white"
            alignItems="center"
            borderTopRightRadius={label === 'PROFILE' ? 20 : 0}
            borderTopLeftRadius={label === 'HOME' ? 20 : 0}>
            {label !== 'POST JOB' ? (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={TypographyStyles.content}>
                <Box>{tabBarIcon(isFocused, label, selectedLabel)}</Box>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityState={isFocused ? {selected: true} : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={style.circle}>
                  <View style={style.innerCircle}>
                    <Image source={job} />
                  </View>
                </TouchableOpacity>
                <View style={style.posttext}>
                  <Text
                    style={[
                      style.postJobText,
                      {color: isFocused ? palette.primary : palette.tertiary1},
                    ]}>
                    POST JOB
                  </Text>
                </View>
              </>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default MyTabBar;

const style = StyleSheet.create({
  postJobText: {
    marginTop: 25,
    fontFamily: fonts.bold,
    fontSize: 10,
  },
  posttext: {
    height: 90,
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    borderWidth: 5,
    borderColor: 'white',
    height: Platform.OS === 'ios' ? 85 : normalize(65),
    width: Platform.OS === 'ios' ? 85 : normalize(65),
    borderRadius: Platform.OS === 'ios' ? 85 / 2 : normalize(65 / 2),
    backgroundColor: palette.primary1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    zIndex: 100,
    height: Platform.OS === 'ios' ? 0 : 85,
    width: Platform.OS === 'ios' ? 0 : 85,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    bottom: Platform.OS === 'ios' ? 90 : 40,
  },
  focusedView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusedImage: {
    marginTop: 10,
    tintColor: palette.primary,
    height: 25,
    width: 25,
  },
  foucsedText: {
    marginTop: 10,
    color: palette.primary,
    fontFamily: fonts.bold,
    fontSize: 10,
  },
  notFocusedImage: {
    marginTop: 10,
    tintColor: '#CBCED1',
    height: 25,
    width: 25,
  },
  textUnfoucsed: {
    marginTop: 10,
    color: palette.tertiary1,
    fontFamily: fonts.bold,
    fontSize: 10,
  },
});
