import React, {useState, useEffect, useReducer, useRef} from 'react';
import {StyleSheet, Animated, Easing, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';

import {createBox, createText} from '@shopify/restyle';
import {Button} from '../../ReusableComponents';
import {palette, size} from '../../Theme/Index';
import {AuthConstants} from '../../../Redux';
const Box = createBox();
const Text = createText();

export default ({navigation, route}) => {
  const progress = useRef(new Animated.Value(0));
  const lottie = useRef(null);
  const dispatch = useDispatch();
  const token = useSelector(state => ({
    ...state.auth.user.token,
  }));
  console.log({token});
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      phoneNumber: '',
      password: '',
      errors: [],
      secure: true,
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
  console.log({route});
  const {params} = route;
  const {reset, from, data} = params;
  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="primary">
      <Box
        borderRadius={20}
        alignItems="center"
        backgroundColor="white"
        width={size.width - 40}
        height={size.height / 2}>
        <LottieView
          progress={progress.current}
          ref={lottie}
          style={styles.lottie}
          source={require('../../../assets/checkmarkAnimation/checkmarkAnimation.json')}
          autoPlay
          loop
        />
        <Text variant="tertiary225regular">Verified</Text>
        <Text
          mt="s"
          variant="tertiary225regular"
          textAlign="center"
          marginHorizontal={'xxl'}>
          You have successfully verified the account.
        </Text>

        {/* <TouchableOpacity
          onPress={() =>
            reset || from
              ? navigation.navigate('Login')
              : dispatch({
                  type: AuthConstants.RESET_STATE,
                  user: 'data',
                })
          }
          style={{
            backgroundColor: palette.primary1,
            height: 45,
            width: '80%',
            alignSelf: 'center',
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Text variant="support716medium">Go To Login</Text>
        </TouchableOpacity> */}
        <Button
          onPress={() =>
            reset || from === 'login'
              ? navigation.navigate('Login')
              : from === 'profile'
              ? dispatch({
                  type: AuthConstants.RESET_STATE,
                  user: 'data',
                })
              : dispatch({
                  type: AuthConstants.USER_INFO_RECEIVED,
                  user: data,
                })
          }
          label={from === 'signup' ? 'Go to Dashboard' : 'Go To Login'}
          buttonStyle={styles.buttonStyle}
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  lottie: {height: size.height / 4, width: size.width / 3},
  buttonStyle: {
    height: 44,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: palette.primary1,
    width: size.width - 80,
    marginHorizontal: 20,
  },
  text: {fontSize: 16, color: palette.tertiary2},
  eye: {height: 30, width: 30},
});
