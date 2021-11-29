import React, {useState, useReducer} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {createBox, createText} from '@shopify/restyle';
import {Button, Header, Search} from '../ReusableComponents';
import {TypographyStyles, fonts, palette} from '../Theme/Index';
const Questions = require('../../assets/survey/ques.png');
const BackIcon = require('../../assets/Back/back1.png');
const Box = createBox();
const Text = createText();
const Arrowback = require('../../assets/Back/back1.png');
const ProfileImg = require('../../assets/profile/ProfilePicture.png');
const Check = require('../../assets/survey/check.png');
export default ({navigation, route}) => {
  return (
    <KeyboardAvoidingView
      style={TypographyStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Box style={styles.imageBackground}>
          <Image source={Arrowback} style={styles.arrow} />
          <Image source={Questions} style={styles.image} />
        </Box>
        <Box flexDirection="row" m="l" alignItems="center">
          <Box flex={0.5}>
            <Text variant="primary12bold">Question 2 out of 4</Text>
          </Box>
          <Box
            height={10}
            flex={0.5}
            borderRadius={12}
            backgroundColor="secondary">
            <Box
              width={'50%'}
              height={10}
              borderRadius={12}
              backgroundColor="primary"
            />
          </Box>
        </Box>

        <Box
          alignItems="center"
          borderRadius={15}
          backgroundColor="support7"
          width={'90%'}
          alignSelf="center">
          <Text
            variant="support214medium"
            paddingVertical="l"
            paddingHorizontal="m">{`How do you think about this contractor’s job quality?`}</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('SurveyTh')}
            style={styles.selectedIndex}>
            <Text variant="support712medium" pl="l">
              Average
            </Text>
            <Image source={Check} style={styles.checkImage} />
          </TouchableOpacity>
          <Box
            marginVertical="m"
            justifyContent="center"
            borderRadius={12}
            backgroundColor="secondary1"
            width={'80%'}
            height={48}>
            <Text variant="secondary412medium" pl="l">
              Very Good
            </Text>
          </Box>
          <Box
            justifyContent="center"
            borderRadius={12}
            backgroundColor="secondary1"
            width={'80%'}
            height={48}>
            <Text variant="secondary412medium" pl="l">
              Good
            </Text>
          </Box>
          <Box
            justifyContent="center"
            borderRadius={12}
            backgroundColor="secondary1"
            width={'80%'}
            height={48}
            marginVertical="m">
            <Text variant="secondary412medium" pl="l">
              Not Satisfied
            </Text>
          </Box>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 20,
    fontFamily: fonts.medium,
  },
  checkImage: {position: 'absolute', right: 15},
  selectedIndex: {
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: palette.primary,
    width: '80%',
    height: 48,
  },
  image: {
    resizeMode: 'contain',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
  arrow: {resizeMode: 'contain', marginLeft: 10, marginTop: 30},
  backIcon: {
    resizeMode: 'contain',
    marginLeft: 20,
  },
  messageBox: {
    height: 74,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  issueTextBox: {
    height: 44,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  viewFlex: {flex: 0.5},
  profileImg: {marginTop: -60},
  header: {
    fontSize: 24,
    fontFamily: fonts.bold,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: palette.secondary1,
  },
  flalistConatiner: {
    marginHorizontal: 20,
  },
  location: {
    tintColor: palette.primary,
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  imageBackground: {
    opacity: 0.8,
    height: 255,
    width: '100%',
    backgroundColor: palette.primary1,
  },
});
