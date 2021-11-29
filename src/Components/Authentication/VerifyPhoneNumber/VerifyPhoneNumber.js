import React, {useState, useEffect, useRef, useReducer} from 'react';
import {useDispatch} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import LottieView from 'lottie-react-native';
import {
  View,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Button, Header} from '../../ReusableComponents';
import authConstants from '../../../Redux/AuthConstants';
import {
  geVerificationCode,
  getVerifyCode,
  requestResendOtp,
} from '../../Services/Index';
import CodeInput from 'react-native-confirmation-code-input';

import {fonts, palette, TypographyStyles} from '../../Theme/Index';
const Box = createBox();
const Text = createText();
const user = require('../../../assets/Verify/user.png');
const CELL_COUNT = 4;

export default ({navigation, route}) => {
  const progress = useRef(new Animated.Value(0));
  const inputEl = useRef(null);
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      errors: '',
      otp: '',
      postData: {},
      screenError: '',
      from: '',
      code: '',
    },
  );
  console.log('FROM === == ====', state.from);

  useEffect(() => {
    Animated.loop(
      Animated.delay(2000),
      Animated.timing(progress.current, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
      }),
    ).start();
  }, []);

  useEffect(() => {
    if (route && route.params) {
      if (route.params.from) {
        setState({from: route.params.from});
      }

      if (route.params.postData) {
        setState({postData: route.params.postData});
      }
    }
  }, []);

  const checkCode = code => {
    if (state.from === 'forgot') {
      verifyForgot(code);
    } else {
      verify(code);
    }
  };

  const verifyForgot = code => {
    const data = {
      otp: code,
      otpType: 'FORGOT',
    };
    getVerifyCode(data)
      .then(response => {
        // const {data} =response
        // const {token} = data
        // dispatch({
        //   type: authConstants.TOKEN,
        //   token: token,
        // });
        navigation.navigate('ResetPassword', {otp: code});
      })
      .catch(error => {
        const {data} = error;
        const {errorMessage} = data;
        dispatch({
          type: authConstants.TOAST,
          toast: {
            title: errorMessage,
            loading: true,
            status: 'error',
          },
        });
      });
  };

  const verify = code => {
    const TypeOTP =
      state.from === 'login'
        ? 'SIGNUP'
        : state.from === 'profile'
        ? 'SIGNUP'
        : 'SIGNUP';
    const data = {
      otp: code,
      otpType: TypeOTP,
    };
    geVerificationCode(data)
      .then(response => {
        const {data} = response;
        const {token} = data;
        dispatch({
          type: authConstants.TOKEN,
          token: token,
        });
        navigation.navigate('AuthSuccess', {from: state.from, data: data});
      })
      .catch(error => {
        const {data} = error;
        const {errorMessage} = data;
        dispatch({
          type: authConstants.TOAST,
          toast: {
            title: errorMessage,
            loading: true,
            status: 'error',
          },
        });
      });
  };

  const resendOtp = code => {
    const TypeOTP =
      state.from === 'forgot'
        ? 'FORGOT'
        : state.from === 'user_verification'
        ? 'UPDATE'
        : 'SIGNUP';

    const data = {
      otpType: TypeOTP,
    };
    requestResendOtp(data)
      .then(response => {
        const {data} = response;
        const {message} = data;
        dispatch({
          type: authConstants.TOAST,
          toast: {
            title: message,
            loading: true,
            status: 'success',
          },
        });
      })
      .catch(error => {});
  };
  const {params} = route;
  const {phone} = params;
  return (
    <Box style={TypographyStyles.container}>
      <Header backgroundColor="primary2" title="" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={TypographyStyles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          keyboardShouldPersistTaps="handled">
          <Box backgroundColor="primary2" height={70}>
            <Box
              position="absolute"
              justifyContent="center"
              alignItems="center"
              top={20}
              left={0}
              right={0}>
              <LottieView
                progress={progress.current}
                style={styles.lottie}
                source={require('../../../assets/lottie/profile.json')}
                autoPlay
                loop
              />
            </Box>
          </Box>
          <Box flex={0.1}></Box>
          <Box mt="xxxl" justifyContent="center" alignItems="center">
            <Text variant="tertiary224regular">OTP Authentication</Text>
            <Text
              mt="l"
              variant="primary314Regular"
              textAlign="center"
              marginHorizontal="xxxl">
              An authentication code has been sent to
            </Text>
            <Text
              variant="primary314Regular"
              textAlign="center"
              marginHorizontal="xxxl">
              (+60) {phone}
            </Text>
          </Box>
          <Box mt="xxxl" justifyContent="center" alignItems="center">
            <CodeInput
              ref={inputEl}
              codeInputStyle={styles.box}
              activeColor={palette.primary}
              inactiveColor={
                state.screenError === '' ? palette.primary : palette.primary1
              }
              keyboardType="number-pad"
              selectionColor="black"
              containerStyle={styles.codeInputContainer}
              value={`${state.otp}`}
              codeLength={4}
              className={'border-b'}
              space={15}
              size={60}
              inputPosition="left"
              onFulfill={code => {
                checkCode(code);
              }}
            />
          </Box>
          <Box flex={1} justifyContent="flex-end" alignItems="center">
            <Text mb="l" mt="l" variant="primary312regular">
              I didn’t receive code
            </Text>
            <Box mb="l" height={43}>
              <Button
                label="Resend Code"
                onPress={() => {
                  resendOtp();
                }}
              />
            </Box>
            <Box height={43}>
              <Button
                label="Changed phone number"
                onPress={() => {
                  navigation.goBack(null);
                }}
              />
            </Box>
            <Box justifyContent="center" alignItems="center" mb="xxl">
              <Text variant="support115Regular" mt="l">
                By Signing up, you agree to our.{' '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Signup');
                }}>
                <Text mt="s" variant="support416regular">
                  Term and Conditions
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
};
const styles = StyleSheet.create({
  lottie: {height: 80, width: 80, borderRadius: 40, backgroundColor: 'white'},
  box: {
    borderRadius: 10,
    borderBottomWidth: 2,
    color: palette.support8,
    fontFamily: fonts.regular,
    fontSize: 20,
    backgroundColor: palette.primary4,
  },
  codeInputContainer: {
    marginLeft: 20,
  },
  scrollViewContainer: {flexGrow: 1},
  center: {alignSelf: 'center'},
  mainImage: {alignSelf: 'center', marginTop: 40},
  titleText: {alignSelf: 'center', marginTop: 30},
  subTitle: {alignSelf: 'center', marginTop: 20},
  subTitleOne: {alignSelf: 'center', marginTop: 5},
  margin30: {marginTop: 30},
  card: {
    marginHorizontal: 30,
    justifyContent: 'center',
    flex: 1,
    marginTop: 15,
  },
  row: {flexDirection: 'row'},
  paddingleft50: {left: 50},
  leftImage: {alignSelf: 'center', marginRight: 3},
  sideNumber: {
    width: 0.5,
    backgroundColor: '#979DA3',
    marginLeft: 5,
  },
  margin15: {marginTop: 15},
  flexEnd: {alignSelf: 'flex-end'},
  bottomButton: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
  },
  bottomtext: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signuptext: {
    textAlign: 'center',
    lineHeight: 30,
  },
});
