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
const BackIcon = require('../../assets/Back/back1.png');
const Box = createBox();
const Text = createText();
const Background = require('../../assets/jobcomplete/background.png');
const Arrowback = require('../../assets/Back/Arrow.png');
const ProfileImg = require('../../assets/profile/ProfilePicture.png');
export default ({navigation, route}) => {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      click: false,
    },
  );
  const {params} = route;
  const {item} = params;

  const survey = click => {
    setState({click: !click});
  };
  return (
    <KeyboardAvoidingView
      style={TypographyStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={Background}
          style={styles.imageBackground}
          resizeMode="cover">
          <Image source={Arrowback} style={styles.arrow} />
        </ImageBackground>
        <Box
          backgroundColor="secondary1"
          flex={0.1}
          alignItems="center"
          justifyContent="center">
          <Image style={styles.profileImg} source={ProfileImg} />
        </Box>

        <Box backgroundColor="secondary1">
          <Box alignItems="center">
            <Text variant="primary21bold">{item.title}</Text>
            <Text variant="support210bold" mt="s">
              {'New York NY'}
            </Text>
          </Box>

          <Box
            flexDirection="row"
            justifyContent="space-between"
            marginHorizontal="l"
            marginVertical="m">
            <Box
              pl="m"
              justifyContent="center"
              height={54}
              backgroundColor="primary"
              width="48.5%"
              borderRadius={12}>
              <Text variant="support714medium">Job Detail</Text>
              <Text variant="support712Bold" opacity={0.5}>
                Install New Light Points
              </Text>
            </Box>

            <Box
              pl="m"
              justifyContent="center"
              height={54}
              backgroundColor="primary"
              width="48.5%"
              borderRadius={12}>
              <Text variant="support714medium">Job Materials</Text>
              <Text variant="support712Bold" opacity={0.5}>
                LED Ceiling Light
              </Text>
            </Box>
          </Box>

          <Text variant="support212bold" p="m" pl="l">
            Job Description
          </Text>

          <Text
            pl="l"
            textAlign="left"
            paddingHorizontal="m"
            variant="support211regular">{`Sed ut perspiciatis unde omnis iste natus error sit voluptatem 
accusantium doloremque laudantium, totam rem aperiam, 
eaque ipsa quae ab illo inventore veritatiset quasi architecto 
beatae vitae dicta sunt explicabo.`}</Text>

          <Box flexDirection="row" marginHorizontal="l" marginVertical="s">
            <TouchableOpacity onPress={() => survey()} style={styles.viewFlex}>
              <Text>Review & Survey</Text>
              <Box
                height={3}
                style={{
                  backgroundColor: state.click ? palette.primary : 'grey',
                }}
                mt="s"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => survey(true)}
              style={styles.viewFlex}>
              <Text>Complaint</Text>
              <Box
                height={3}
                style={{
                  backgroundColor: state.click ? palette.primary : 'grey',
                }}
                mt="s"
              />
            </TouchableOpacity>
          </Box>
          <Text variant="support212bold" p="m" pl="l">
            Select Issue
          </Text>
          <TouchableOpacity style={styles.issueTextBox}></TouchableOpacity>

          <Text variant="support212bold" p="m" pl="l">
            Message
          </Text>
          <TouchableOpacity style={styles.messageBox}></TouchableOpacity>

          <Button
            buttonStyle={styles.button}
            label="Submit"
            onPress={() => navigation.navigate('PostJobDetail')}
          />
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
  imageBackground: {height: 164, width: '100%'},
});
