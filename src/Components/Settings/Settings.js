import React, {useState, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Header} from '../ReusableComponents';
import AuthConstants from '../../Redux/AuthConstants';
const Box = createBox();
const Text = createText();
const Hamburger = require('../../assets/Hamburger/hamburger.png');
const About = require('../../assets/Settings/About.png');
const Logout = require('../../assets/Settings/Logout.png');
const MyAccount = require('../../assets/Settings/MyAccount.png');
const right = require('../../assets/Settings/right.png');

export default ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <Box flex={1}>
      <Header
        title="Settings"
        left={() => {
          return <Box height={50} width={50} />;
        }}
      />
      <Box flex={1} backgroundColor="primary4">
        <Box flexDirection="row" mt="xxl" ml="l">
          <Image source={MyAccount} />
          <Box ml="l">
            <Text variant="support216bold" mt="s">
              My Account
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <Text variant="support114Regular">Edit Profile</Text>
            </TouchableOpacity>
            <Text variant="support114Regular">Change Password</Text>
          </Box>
        </Box>
        <Box
          flexDirection="row"
          mt="xxl"
          ml="l"
          justifyContent="space-between"
          mr="l">
          <Box flexDirection="row">
            <Image source={MyAccount} />
            <TouchableOpacity
              onPress={() => navigation.navigate('ComingSoon')}
              style={styles.contactAdmin}>
              <Text variant="support216bold" mt="s">
                Contact Admin
              </Text>
            </TouchableOpacity>
          </Box>
          <Image source={right} />
        </Box>
        <Box
          flexDirection="row"
          mt="xxl"
          ml="l"
          justifyContent="space-between"
          mr="l">
          <Box flexDirection="row">
            <Image source={MyAccount} />
            <TouchableOpacity style={styles.contactAdmin}>
              <Text variant="support216bold" mt="s">
                About
              </Text>
            </TouchableOpacity>
          </Box>
          <Image source={right} />
        </Box>
        <TouchableOpacity
          onPress={() => {
            dispatch({
              type: AuthConstants.RESET_STATE,
              user: 'data',
            });
          }}>
          <Box
            flexDirection="row"
            mt="xxl"
            ml="l"
            alignItems="center"
            justifyContent="space-between"
            mr="l">
            <Box flexDirection="row">
              <Image source={Logout} />
              <Box ml="l" alignItems="center">
                <Text variant="support216bold" mt="s">
                  Logout
                </Text>
              </Box>
            </Box>
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  hamburger: {
    resizeMode: 'contain',
    marginLeft: 20,
  },
  contactAdmin: {marginLeft: 20},
});
