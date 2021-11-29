import AsyncStorage from '@react-native-community/async-storage';
import {Dimensions, Platform, PixelRatio} from 'react-native';
const {width, height} = Dimensions.get('window');
// based on iphone 5s's scale
const scalee = width / 320;
/**
 * @function getProp
 * @param {*} p
 * @desc it will get the data string from the repsonse
 */
export const getProp = p => o =>
  p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);

/**
 * @function setUserInfo
 * @param info
 * @returns Promise
 * @description Save user info into async storage
 */
export const setAuthToken = info => {
  AsyncStorage.setItem('Auth_token', JSON.stringify(info));
};

/**
 * @function removeAuthInfo
 * @description remove user info from async storage
 */
export const removeAuthToken = () => {
  AsyncStorage.removeItem('Auth_token');
};

/**
 * @function getToken
 * @returns userInfo
 * @description Returns user info if saved in async storage else null
 */
export const getToken = async () => {
  const token = await AsyncStorage.getItem('Auth_token').then(data => {
    try {
      const info = JSON.parse(data);
      return info;
    } catch (e) {
      return null;
    }
  });
  return token;
};

export const normalize = size => {
  const newSize = size * scalee;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};
/*
 * @file: Responsive Fonts.js
 * @description: contains all moderate scale calculation
 * @author: Suraj Sanwal
 * */
('use strict');

// console.log("height & width ===>os", height, width, Platform.OS);

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scaleValue = PixelRatio.get() / 2;
export const scale = size => (width / guidelineBaseWidth) * size;
export const verticalScale = size => (height / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.5) => {
  if (Platform.OS === 'web') {
    factor = 0.1;
  }
  return size + (scale(size) - size) * factor;
};
