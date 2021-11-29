import React, {useState, useEffect, useReducer, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import {createBox, createText} from '@shopify/restyle';
import {Button, Input, Header} from '../../ReusableComponents';
import LottieView from 'lottie-react-native';
import {palette, size, TypographyStyles} from '../../Theme/Index';
import {requestForgetPassword} from '../../Services/Index';
import {setAuthToken} from '../../Helpers/utils';
import authConstants from '../../../Redux/AuthConstants';

const password = require('../../../assets/PasswordRecovery/PasswordRecovery.png');
const Box = createBox();
const Text = createText();
const phone = require('../../../assets/InputIcons/phone.png');
const eye = require('../../../assets/eye/eye-icon.png');
const eyeHide = require('../../../assets/eye/password-hide.png');

export default ({navigation, route}) => {
  const progress = useRef(new Animated.Value(0));
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      phoneNumber: '',
      errors: [],
    },
  );

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

  /**
   * @function validateFields
   * @returns array of errors.
   * @description it will validate phonenumber and password.
   */
  const validateFields = () => {
    const emptyFields = [];

    if (state.phoneNumber.trim().length === 0) {
      const obj = {
        name: 'phoneNumber',
        valid: false,
        message: 'Phone Number is required.',
      };
      emptyFields.push(obj);
    }

    if (emptyFields.length) {
      return emptyFields;
    }

    return null;
  };

  /**
   * @function useEffect
   * @description it will check the phonenumber and password after onchange.
   */
  useEffect(() => {
    const error = validateFields();
    if (error !== null) {
      setState({errors: error});
    } else {
      setState({errors: []});
    }
  }, [state.phoneNumber]);

  /**
   * @function PasswordRecovery
   * @description it will check phone number and navigate to reset password.
   */
  const PasswordRecovery = () => {
    const error = validateFields();
    if (error !== null) {
      setState({errors: error});
    } else {
      setState({errors: []});
      const data = {
        mobile: state.phoneNumber,
      };
      requestForgetPassword(data)
        .then(response => {
          const {data} = response;
          const {token} = data;
          dispatch({
            type: authConstants.TOKEN,
            token: token,
          });
          navigation.navigate('Verify', {
            from: 'forgot',
            phone: state.phoneNumber,
          });
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
    }
  };

  /**
   * @function onChangeText
   * @param {*} key
   * @param {*} value
   * @description it will set state for its key
   */
  const onChangeText = (key, value) => {
    setState({[key]: value});
  };

  const objName = element => element.name === 'phoneNumber';
  const phoneNumberIndex = state.errors.findIndex(objName);
  return (
    <Box style={TypographyStyles.container}>
      <Header backgroundColor="primary2" title="" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={TypographyStyles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled">
          <Box backgroundColor="primary2" height={70}>
            <Box
              position="absolute"
              justifyContent="center"
              alignItems="center"
              top={20}
              left={0}
              right={0}>
              {/* <Image source={password} style={styles.image} /> */}
              <LottieView
                progress={progress.current}
                style={styles.lottie}
                source={require('../../../assets/lottie/lock.json')}
                autoPlay
                loop
              />
            </Box>
          </Box>
          <Box flex={0.1}></Box>
          <Box mt="xxxl" justifyContent="center" alignItems="center">
            <Text variant="tertiary224regular">Password Recovery</Text>
            <Text
              mt="l"
              variant="primary314Regular"
              textAlign="center"
              marginHorizontal="xxxl">
              Enter your Phone number to recover your password
            </Text>
          </Box>
          <Box mt="xxxl" justifyContent="center" alignItems="center">
            <Input
              returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
              title="Phone Number"
              value={state.phoneNumber}
              showErrorField={
                phoneNumberIndex !== -1 && !state.errors[phoneNumberIndex].valid
              }
              errorText={
                phoneNumberIndex !== -1 &&
                state.errors[phoneNumberIndex].message
              }
              left={() => {
                return <Image style={styles.eye} source={phone} />;
              }}
              onChangeText={text => {
                onChangeText('phoneNumber', text);
              }}
              keyboardType="numeric"
              onSumbitEditing={() => {
                passwordRef.current?.focus();
              }}
            />
          </Box>
          <Box flex={1} justifyContent="flex-end" alignItems="center">
            <Box mb="xxxl" height={43}>
              <Button
                label="Send Code"
                onPress={() => {
                  PasswordRecovery();
                }}
              />
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
};

const styles = StyleSheet.create({
  lottie: {height: 80, width: 80, borderRadius: 40, backgroundColor: 'white'},
  image: {alignSelf: 'center'},
  content: {flexGrow: 1},
  buttonStyle: {
    height: 44,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: palette.primary2,
    width: size.width,
    marginHorizontal: 20,
  },
  text: {fontSize: 16, color: palette.tertiary2},
  eye: {height: 30, width: 30},
});
