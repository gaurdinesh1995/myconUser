import React, {useState, useEffect, useReducer, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {createBox, createText} from '@shopify/restyle';
import authConstants from '../../../Redux/AuthConstants';
import {Button, Input} from '../../ReusableComponents';
import {loginUser} from '../../Services/Index';
import {palette, size, TypographyStyles} from '../../Theme/Index';
const Chat = require('../../../assets/Login/login.png');
const Box = createBox();
const Text = createText();
const phone = require('../../../assets/InputIcons/phone.png');
const password = require('../../../assets/InputIcons/password.png');
const eye = require('../../../assets/eye/eye-icon.png');
const eyeHide = require('../../../assets/eye/password-hide.png');

export default ({navigation, route}) => {
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      phoneNumber: '',
      password: '',
      errors: [],
      secure: true,
    },
  );

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
    if (state.password.trim().length === 0) {
      const obj = {
        name: 'password',
        valid: false,
        message: 'Password is required.',
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
    if (state.phoneNumber !== '' || state.password !== '') {
      if (error !== null) {
        setState({errors: error});
      } else {
        setState({errors: []});
      }
    }
  }, [state.phoneNumber, state.password]);

  /**
   * @function login
   * @description it will login into app and check validations.
   */
  const login = () => {
    const error = validateFields();
    if (error !== null) {
      setState({errors: error});
    } else {
      setState({errors: []});
      const data = {
        mobile: state.phoneNumber,
        password: state.password,
      };
      dispatch({
        type: authConstants.LOADING,
        loading: true,
      });
      loginUser(data)
        .then(response => {
          dispatch({
            type: authConstants.LOADING,
            loading: false,
          });
          if (response.success) {
            const {data} = response;
            const {token, user} = data;
            dispatch({
              type: authConstants.TOKEN,
              token: token,
            });
            if (!user.isVerified) {
              navigation.navigate('Verify', {
                from: 'login',
                phone: user.mobile,
              });
            } else {
              dispatch({
                type: authConstants.USER_INFO_RECEIVED,
                user: response.data.user,
              });
              dispatch({
                type: authConstants.TOKEN,
                token: token,
              });
            }
          } else {
            // const {data} = response;
            // const {message} = data;
            dispatch({
              type: authConstants.USER_INFO_RECEIVED,
              user: 'user',
            });
            dispatch({
              type: authConstants.TOAST,
              toast: {
                title: 'hello',
                loading: true,
                status: 'error',
              },
            });
          }
        })
        .catch(error => {
          const {data} = error;
          const {errorMessage} = data;
          dispatch({
            type: authConstants.LOADING,
            loading: false,
          });
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

  let param = '';
  if (route && route.params !== undefined) {
    param = route.params.space;
  }

  const objName = element => element.name === 'phoneNumber';
  const phoneNumberIndex = state.errors.findIndex(objName);
  const objPassword = element => element.name === 'password';
  const passwordIndex = state.errors.findIndex(objPassword);
  return (
    <KeyboardAvoidingView
      style={TypographyStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.content, {paddingTop: param.bottom}]}>
        <Box
          flex={0.8}
          justifyContent="center"
          alignItems="center"
          backgroundColor="primary2">
          <Image source={Chat} />
        </Box>
        <Box flex={2}>
          <Box mt="l" ml="l">
            <Text variant="tertiary224regular">Let’s Log You In</Text>
            <Text variant="primary314Regular" mt="s">
              Welcome back, you’ve been missed!
            </Text>
          </Box>
          <Box mt="xxl">
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
          <Box mt="l">
            <Input
              ref={passwordRef}
              title="Password"
              value={state.password}
              showErrorField={
                passwordIndex !== -1 && !state.errors[passwordIndex].valid
              }
              errorText={
                passwordIndex !== -1 && state.errors[passwordIndex].message
              }
              left={() => {
                return <Image style={styles.eye} source={password} />;
              }}
              right={() => {
                return (
                  <TouchableOpacity
                    onPress={() => setState({secure: !state.secure})}>
                    <Image
                      style={styles.eye}
                      source={state.secure ? eye : eyeHide}
                    />
                  </TouchableOpacity>
                );
              }}
              secureTextEntry={state.secure}
              onChangeText={text => {
                onChangeText('password', text);
              }}
            />
          </Box>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PasswordRecovery');
            }}>
            <Box mt="l" ml="l" mb="l">
              <Text variant="support412regular">Forgot Password?</Text>
            </Box>
          </TouchableOpacity>
          <Box
            flex={1}
            mt="xxl"
            alignItems="center"
            marginHorizontal="l"
            mb="l">
            <Box height={48}>
              <Button
                label="Login"
                onPress={() => {
                  login();
                }}
              />
            </Box>
            <Box height={48} mt="s">
              <Button
                buttonStyle={styles.buttonStyle}
                textStyle={styles.text}
                label="Create an account"
                onPress={() => {
                  navigation.navigate('Signup');
                }}
              />
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
