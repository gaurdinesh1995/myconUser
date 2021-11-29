import React, {useEffect, useReducer, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {createBox, createText} from '@shopify/restyle';
import {Button, Input, Header} from '../ReusableComponents';
import {palette, TypographyStyles} from '../Theme/Index';
import {
  getAvatarsProfile,
  registerUser,
  updateAvatarProfile,
} from '../Services/Index';
import {setAuthToken} from '../Helpers/utils';
import {AuthConstants, ProfileConstant} from '../../Redux';
import {isBuffer} from 'lodash';
import ImagePicker from 'react-native-image-crop-picker';
// import ImageProgress from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  openSettings,
} from 'react-native-permissions';
import {Icon} from 'native-base';
const Chat = require('../../assets/Signup/signup.png');
const Box = createBox();
const Text = createText();
const phone = require('../../assets/InputIcons/phone.png');
const password = require('../../assets/InputIcons/password.png');
const Flag = require('../../assets/flag/flag.png');
const eyeHide = require('../../assets/eye/password-hide.png');
const email = require('../../assets/InputIcons/email.png');
const user = require('../../assets/InputIcons/user.png');

export default ({navigation, route}) => {
  const emailRef = useRef(null);
  const PhoneNumberRef = useRef(null);
  const PasswordRef = useRef(null);
  const ConfirmPasswordRef = useRef(null);

  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      email: '',
      phoneNumber: '',
      errors: [],
      secure: true,
      confirmSecure: true,
      firstname: '',
      lastname: '',
      // country: '',
      username: '',
      name: '',
      last: '',
      profileImage: '',
      showImage: false,
    },
  );
  const User = useSelector(state => ({
    ...state.auth.user.user,
  }));
  console.log('STATE');
  /**
   * @function profileEmptyImageAlert
   * @description options for profile picture upload
   */
  const profileEmptyImageAlert = () => {
    if (Platform.OS === 'ios') {
      Alert.alert(
        'How would you like to upload your photo..?',
        'please select a medium',
        [
          {
            text: 'Gallery',
            onPress: () => {
              check(PERMISSIONS.IOS.PHOTO_LIBRARY)
                .then(result => {
                  switch (result) {
                    case RESULTS.UNAVAILABLE:
                      const error = 'Sorry!, This feature is not available.';
                      return showToastMessage('error', error);
                    case RESULTS.DENIED:
                      request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
                        if (result === 'granted') {
                          return getCameraImage();
                        }
                      });
                      break;
                    case RESULTS.GRANTED:
                      getGalleryImage();
                      break;
                    case RESULTS.BLOCKED:
                      const title =
                        'Your photo permission for this app is blocked';
                      const titleOne =
                        'Would you like to open app settings to enable photo settings..?';
                      return openSettingApp(title, titleOne);
                  }
                })
                .catch(error => {
                  // …
                });
            },
          },
          {
            text: 'Camera',
            onPress: () => {
              check(PERMISSIONS.IOS.CAMERA)
                .then(result => {
                  switch (result) {
                    case RESULTS.UNAVAILABLE:
                      const error = 'Feature unavailable';
                      return Alert.alert(`${error}`);
                    case RESULTS.DENIED:
                      request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
                        if (result === 'granted') {
                          return getCameraImage();
                        }
                      });
                      break;
                    case RESULTS.GRANTED:
                      getCameraImage();
                      break;
                    case RESULTS.BLOCKED:
                      const title =
                        'Your photo permission for this app is blocked';
                      const titleOne =
                        'Would you like to open app settings to enable photo settings..?';
                      return openSettingApp(title, titleOne);
                  }
                })
                .catch(error => {
                  console.log({error});
                });
            },
          },

          {
            text: 'Cancel',
            style: 'destructive',
          },
        ],
        {cancelable: true},
      );
    } else {
      Alert.alert(
        'How would you like to upload your photo..?',
        'please select a medium',
        [
          {
            text: 'Gallery',
            onPress: () => {
              getGalleryImage();
            },
          },
          {
            text: 'Camera',
            onPress: () => {
              getCameraImage();
            },
          },

          {
            text: 'Cancel',
            style: 'destructive',
          },
        ],
        {cancelable: true},
      );
    }
  };

  const openSettingApp = (title, title1) => {
    Alert.alert(
      `${title}`,
      `${title1}`,
      [
        {
          text: 'Yes',
          onPress: () => {
            openSettings();
          },
        },
        {
          text: 'No',
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const getGalleryImage = () => {
    ImagePicker.openPicker({
      compressImageQuality: Platform.OS === 'ios' ? 0.3 : 1,
      mediaType: 'photo',
      forceJpg: true,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      multiple: false,
      cropperCircleOverlay: true,
      cropping: true,
    }).then(image => {
      const photoUrl = image.path;
      setState({
        profileImage: photoUrl,
        showImage: true,
      });
    });
  };

  const getCameraImage = () => {
    ImagePicker.openCamera({
      compressImageQuality: Platform.OS === 'ios' ? 0.3 : 1,
      mediaType: 'photo',
      forceJpg: true,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      multiple: false,
      cropperCircleOverlay: true,
      cropping: true,
    }).then(image => {
      const photoUrl = image.path;
      setState({
        profileImage: photoUrl,
        showImage: true,
      });
    });
  };

  const deleteImage = () => {
    setState({
      profileImage: '',
      showImage: false,
    });
  };

  /**
   * @function validateFields
   * @returns array of errors.
   * @description it will validate phonenumber and password.
   */
  const validateFields = () => {
    const emptyFields = [];
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (state.firstname === '' || null) {
      const obj = {
        name: 'firstname',
        valid: false,
        message: 'First Name is required.',
      };
      emptyFields.push(obj);
    }
    if (state.lastname === '' || null) {
      const obj = {
        name: 'lastname',
        valid: false,
        message: 'Last Name is required.',
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
    if (state.phoneNumber.length === 0) {
      const obj = {
        name: 'phoneNumber',
        valid: false,
        message: 'Phone Number is required.',
      };
      emptyFields.push(obj);
    }

    // if (state.country === '' || null) {
    //   const obj = {
    //     name: 'country',
    //     valid: false,
    //     message: 'country is required.',
    //   };
    //   emptyFields.push(obj);
    // }

    if (emptyFields.length) {
      return emptyFields;
    }

    return null;
  };

  useEffect(() => {
    getProfile();
  }, []);

  /**
   * @function useEffect
   * @description it will check the phonenumber and password after onchange.
   */
  useEffect(() => {
    if (
      state.firstname !== '' ||
      state.lastname !== '' ||
      state.email !== '' ||
      state.phoneNumber !== ''
      // ||
      // state.country !== ''
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
    state.firstname,
    state.lastname,
    state.email,
    state.phoneNumber,
    // state.country,
  ]);

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
  const objfirstName = element => element.name === 'firstname';
  const firstnameIndex = state.errors.findIndex(objfirstName);
  const objlastname = element => element.name === 'lastname';
  const lastnameIndex = state.errors.findIndex(objlastname);
  const objEmail = element => element.name === 'email';
  const emailIndex = state.errors.findIndex(objEmail);
  const objphonenumber = element => element.name === 'phoneNumber';
  const phonenumberIndex = state.errors.findIndex(objphonenumber);
  // const objcountry = element => element.name === 'country';
  // const countryIndex = state.errors.findIndex(objcountry);

  const getProfile = () => {
    getAvatarsProfile()
      .then(response => {
        const {data} = response;
        const {user} = data;
        console.log('PROFILE', user.profile);
        setState({
          profileImage: user.profile !== null ? user.profile : '',
          username: user.userName,
          firstname: user.firstName !== null ? user.firstName : '',
          lastname: user.lastName !== null ? user.lastName : '',
          email: user.email,
          phoneNumber: user.mobile.toString(),
          country: user.country,
          name: user.firstName !== null ? user.firstName : '',
          last: user.lastName !== null ? user.lastName : '',
          showImage: false,
        });
        console.log({response});
      })
      .catch(error => {
        console.log({error});
      });
  };

  const updateProfile = () => {
    const validUrl = /(https?:\/\/.*\.(?:png|jpg))/i;
    var data = new FormData();
    data.append('firstName', state.firstname);
    data.append('lastName', state.lastname);
    if (state.phoneNumber !== User.mobile) {
      data.append('mobile', state.phoneNumber);
    } else if (state.email !== User.email) {
      data.append('email', state.email);
    } else if (state.showImage) {
      data.append('profile', {
        uri: state.profileImage,
        name: 'photo.jpg',
        type: 'image/jpg',
      });
    }
    dispatch({
      type: AuthConstants.LOADING,
      loading: true,
    });
    updateAvatarProfile(data)
      .then(response => {
        const {data} = response;
        const {message, token} = data;
        dispatch({
          type: AuthConstants.LOADING,
          loading: false,
        });
        if (token) {
          dispatch({
            type: AuthConstants.TOKEN,
            token: token,
          });
          navigation.navigate('Verify', {
            from: 'profile',
            phone: state.phoneNumber,
          });
        }
        getProfile();
        dispatch({
          type: AuthConstants.TOAST,
          toast: {
            title: message,
            loading: true,
            status: 'success',
          },
        });
        console.log({response});
      })
      .catch(error => {
        const {data} = error;
        const {errorMessage} = data;
        dispatch({
          type: AuthConstants.TOAST,
          toast: {
            title: errorMessage,
            loading: true,
            status: 'error',
          },
        });
        console.log({error});
        dispatch({
          type: AuthConstants.LOADING,
          loading: false,
        });
        getProfile();
      });
  };
  console.log('STATE', state);
  return (
    <>
      <Header
        title="Profile"
        right={() => {
          return (
            <Box>
              <TouchableOpacity onPress={() => updateProfile()}>
                <Text variant="primary12bold">Save</Text>
              </TouchableOpacity>
            </Box>
          );
        }}
      />
      <KeyboardAvoidingView
        style={TypographyStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}>
          <Box
            flex={0.8}
            justifyContent="center"
            alignItems="center"
            backgroundColor="support7"
            paddingTop="xxl"
            paddingBottom="l">
            <Box
              style={{
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  profileEmptyImageAlert();
                }}
                style={{}}>
                <Box
                  style={{
                    borderRadius: 90 / 2,
                    height: 90,
                    width: 90,
                    borderWidth: 5,
                    borderColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={
                      state.profileImage !== ''
                        ? state.showImage
                          ? {uri: state.profileImage}
                          : {
                              uri: `https://api-mycontractor.segwitz.com${state.profileImage}`,
                            }
                        : state.showImage
                        ? {uri: state.profileImage}
                        : user
                    }
                    style={[
                      {
                        borderRadius: 90 / 2,
                        height: 90,
                        width: 90,
                        //borderWidth: 5,
                        // borderColor: 'white',
                        overflow: 'hidden',
                      },
                    ]}
                  />
                </Box>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  deleteImage();
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 100,
                  borderRadius: 25 / 2,
                  height: 25,
                  width: 25,
                  backgroundColor: 'white',
                  elevation: 5,
                  position: 'absolute',
                  top: -15,
                  right: -15,
                }}>
                <Icon
                  style={{color: palette.primary, fontSize: 20}}
                  name="cross"
                  type="Entypo"
                />
              </TouchableOpacity>
            </Box>
            {/* <Image style={styles.profileImage} source={user} /> */}
            <Text mt="l" variant="support216bold">
              {state.name + ' ' + state.last}
            </Text>
          </Box>
          <Box flex={2} backgroundColor="primary2" pb="l">
            <Text pl="l" mt="m" variant="support216bold">
              Profile Information
            </Text>

            <Box mt="xxl">
              <Input
                returnKeyType={'next'}
                title="First Name"
                value={state.firstname}
                showErrorField={
                  firstnameIndex !== -1 && !state.errors[firstnameIndex].valid
                }
                errorText={
                  firstnameIndex !== -1 && state.errors[firstnameIndex].message
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
                  onChangeText('firstname', text);
                }}
                onSubmitEditing={() => {
                  emailRef.current.focus();
                }}
              />
            </Box>

            <Box mt="xxl">
              <Input
                returnKeyType={'next'}
                title="Last Name"
                value={state.lastname}
                showErrorField={
                  lastnameIndex !== -1 && !state.errors[lastnameIndex].valid
                }
                errorText={
                  lastnameIndex !== -1 && state.errors[lastnameIndex].message
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
                  onChangeText('lastname', text);
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
                errorText={
                  emailIndex !== -1 && state.errors[emailIndex].message
                }
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
                  phonenumberIndex !== -1 &&
                  !state.errors[phonenumberIndex].valid
                }
                errorText={
                  phonenumberIndex !== -1 &&
                  state.errors[phonenumberIndex].message
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
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: palette.primary2,
    padding: 10,
    resizeMode: 'contain',
  },
  scrollViewContainer: {flexGrow: 1},
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
});
