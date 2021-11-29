import React, {useEffect, useReducer, useRef} from 'react';
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
import {Button, Input} from '../../ReusableComponents';
import {palette, TypographyStyles} from '../../Theme/Index';
import {registerUser} from '../../Services/Index';
import authConstants from '../../../Redux/AuthConstants';
const Chat = require('../../../assets/Signup/signup.png');
const Box = createBox();
const Text = createText();
const phone = require('../../../assets/InputIcons/phone.png');
const password = require('../../../assets/InputIcons/password.png');
const eye = require('../../../assets/eye/eye-icon.png');
const eyeHide = require('../../../assets/eye/password-hide.png');
const email = require('../../../assets/InputIcons/email.png');
const user = require('../../../assets/InputIcons/user.png');

export default ({navigation, route}) => {
  const emailRef = useRef(null);
  const PhoneNumberRef = useRef(null);
  const PasswordRef = useRef(null);
  const ConfirmPasswordRef = useRef(null);

  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      username: '',
      email: '',
      confirmPassword: '',
      phoneNumber: '',
      password: '',
      errors: [],
      secure: true,
      confirmSecure: true,
    },
  );

  /**
   * @function validateFields
   * @returns array of errors.
   * @description it will validate phonenumber and password.
   */
  const validateFields = () => {
    const emptyFields = [];
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (state.username.trim().length === 0) {
      const obj = {
        name: 'username',
        valid: false,
        message: 'User Name is required.',
      };
      emptyFields.push(obj);
    }
    if (state.email.trim().length === 0) {
      const obj = {
        name: 'email',
        valid: false,
        message: 'Email is required.',
      };
      emptyFields.push(obj);
    }
    if (!re.test(String(state.email).toLowerCase())) {
      const obj = {
        name: 'email',
        valid: false,
        message: 'Valid email is required.',
      };
      emptyFields.push(obj);
    }
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
    if (state.confirmPassword.trim().length === 0) {
      const obj = {
        name: 'confirmPassword',
        valid: false,
        message: 'Confirm Password is required.',
      };
      emptyFields.push(obj);
    }
    if (
      state.confirmPassword.trim().length !== 0 &&
      state.password.trim().length !== 0 &&
      state.confirmPassword.trim() !== state.password.trim()
    ) {
      const obj = {
        name: 'confirmPassword',
        valid: false,
        message: 'Confirm Password should match password.',
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
    if (
      state.username !== '' ||
      state.email !== '' ||
      state.phoneNumber !== '' ||
      state.password !== '' ||
      state.confirmPassword !== ''
    ) {
      const error = validateFields();
      if (error !== null) {
        setState({errors: error});
      } else {
        setState({errors: []});
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.username,
    state.email,
    state.phoneNumber,
    state.password,
    state.confirmPassword,
  ]);

  /**
   * @function signup
   * @description it will signup into app and check validations.
   */
  const signup = () => {
    const error = validateFields();
    if (error !== null) {
      setState({errors: error});
    } else {
      setState({errors: []});
      const data = {
        userName: state.username,
        email: state.email,
        mobile: state.phoneNumber,
        password: state.password,
      };
      registerUser(data)
        .then(response => {
          if (response.data) {
            const {data} = response;
            const {token, user} = data;
            dispatch({
              type: authConstants.TOKEN,
              token: token,
            });
            navigation.navigate('Verify', {
              from: 'signup',
              phone: state.phoneNumber,
            });
          } else {
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
      //navigation.navigate('Verify');
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
  const objUserName = element => element.name === 'username';
  const usernameIndex = state.errors.findIndex(objUserName);
  const objName = element => element.name === 'phoneNumber';

  const phoneNumberIndex = state.errors.findIndex(objName);
  const objEmail = element => element.name === 'email';
  const emailIndex = state.errors.findIndex(objEmail);
  const objPassword = element => element.name === 'password';
  const passwordIndex = state.errors.findIndex(objPassword);
  const objConfirmPassword = element => element.name === 'confirmPassword';
  const confirmPasswordIndex = state.errors.findIndex(objConfirmPassword);
  return (
    <KeyboardAvoidingView
      style={TypographyStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <Box
          flex={0.8}
          justifyContent="center"
          alignItems="center"
          backgroundColor="primary2"
          paddingTop="xxl"
          paddingBottom="l"
          style={{paddingTop: param.top}}>
          <Image resizeMode="contain" source={Chat} />
        </Box>
        <Box flex={2}>
          <Box mt="l" ml="l">
            <Text variant="tertiary224regular">Let’s Sign You In</Text>
            <Text variant="primary314Regular" mt="s">
              Welcome back, you’ve been missed!
            </Text>
          </Box>
          <Box mt="xxl">
            <Input
              returnKeyType={'next'}
              title="Username"
              value={state.username}
              showErrorField={
                usernameIndex !== -1 && !state.errors[usernameIndex].valid
              }
              errorText={
                usernameIndex !== -1 && state.errors[usernameIndex].message
              }
              left={() => {
                return (
                  <Image
                    style={styles.eye}
                    resizeMode="contain"
                    source={user}
                  />
                );
              }}
              onChangeText={text => {
                onChangeText('username', text);
              }}
              onSubmitEditing={() => {
                emailRef.current.focus();
              }}
            />
          </Box>
          <Box mt="l">
            <Input
              ref={emailRef}
              title="Email"
              value={state.email}
              showErrorField={
                emailIndex !== -1 && !state.errors[emailIndex].valid
              }
              errorText={emailIndex !== -1 && state.errors[emailIndex].message}
              left={() => {
                return (
                  <Image
                    style={styles.eye}
                    resizeMode="contain"
                    source={email}
                  />
                );
              }}
              onChangeText={text => {
                onChangeText('email', text);
              }}
              onSubmitEditing={() => {
                PhoneNumberRef.current.focus();
              }}
            />
          </Box>
          <Box mt="l">
            <Input
              ref={PhoneNumberRef}
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
                PasswordRef.current?.focus();
              }}
            />
          </Box>
          <Box mt="l">
            <Input
              ref={PasswordRef}
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
              onSubmitEditing={() => {
                ConfirmPasswordRef.current.focus();
              }}
            />
          </Box>
          <Box mt="l">
            <Input
              ref={ConfirmPasswordRef}
              title="Confirm Password"
              value={state.confirmPassword}
              showErrorField={
                confirmPasswordIndex !== -1 &&
                !state.errors[confirmPasswordIndex].valid
              }
              errorText={
                confirmPasswordIndex !== -1 &&
                state.errors[confirmPasswordIndex].message
              }
              left={() => {
                return <Image style={styles.eye} source={password} />;
              }}
              right={() => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      setState({confirmSecure: !state.confirmSecure})
                    }>
                    <Image
                      style={styles.eye}
                      source={state.confirmSecure ? eye : eyeHide}
                    />
                  </TouchableOpacity>
                );
              }}
              secureTextEntry={state.confirmSecure}
              onChangeText={text => {
                onChangeText('confirmPassword', text);
              }}
            />
          </Box>

          <Box flex={1} mt="xxl" alignItems="center">
            <Box height={48}>
              <Button
                label="Signup"
                onPress={() => {
                  signup();
                }}
              />
            </Box>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Box mt="l" ml="l" mb="l">
                <Text variant="support115Regular">
                  Already have an account?{' '}
                  <Text variant="support416regular">SignIn</Text>
                </Text>
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    height: 44,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: palette.primary2,
    marginHorizontal: 20,
  },
  text: {fontSize: 16, color: palette.tertiary2},
  eye: {height: 30, width: 30},
  scrollContainer: {flexGrow: 1},
});
