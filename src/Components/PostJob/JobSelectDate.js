import React, {useReducer} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {createBox, createText} from '@shopify/restyle';
import {Button, Header} from '../ReusableComponents';
import {TypographyStyles, fonts} from '../Theme/Index';
import Calendar from '../Calendar/Calendar';
import {useSelector, useDispatch} from 'react-redux';

const Location = require('../../assets/location/location.png');
const Box = createBox();
const Text = createText();

export default ({navigation, route}) => {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      propertyList: {},
      date: '',
    },
  );
  const categoryList = useSelector(state => ({
    ...state.job,
    // ...state.auth.user.user,
  }));
  console.log({categoryList});
  const {location} = categoryList;

  return (
    <Box flex={1}>
      <Header
        title="Post Jobs"
        styleTitle={styles.headerTitle}
        style={styles.header}
      />
      <KeyboardAvoidingView
        style={TypographyStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <Box
            backgroundColor="secondary1"
            justifyContent="center"
            height={50}
            width={'100%'}>
            <Text pl="l" variant="support216bold">
              Job Completion Target Date
            </Text>
          </Box>
          <Calendar />
          <Text p="l" variant="support216bold">
            Location
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SelectLocation')}>
            <Box
              backgroundColor="secondary1"
              flexDirection="row"
              alignSelf="center"
              justifyContent="space-between"
              alignItems="center"
              borderRadius={12}
              height={50}
              width={'90%'}>
              <Text pl="l" variant="support114Regular">
                {location || 'Select Location'}
              </Text>
              <Image style={styles.locationImg} source={Location} />
            </Box>
          </TouchableOpacity>
          <Button
            buttonStyle={styles.button}
            label="Submit"
            onPress={() => navigation.navigate('JobSummary')}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
};
const styles = StyleSheet.create({
  hamburger: {
    resizeMode: 'contain',
    marginLeft: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontFamily: fonts.bold,
  },
  headerTitle: {
    color: '#FFF',
  },
  button: {
    marginVertical: 20,
    fontFamily: fonts.medium,
  },
  locationImg: {
    marginRight: 20,
  },
});
