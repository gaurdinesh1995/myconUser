import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {SharedElement} from 'react-navigation-shared-element';
import {createBox, createText} from '@shopify/restyle';
import {Button, Header, Search} from '../ReusableComponents';
import {TypographyStyles, fonts} from '../Theme/Index';
const Hamburger = require('../../assets/Hamburger/hamburger.png');
const SearchIcon = require('../../assets/Search/search.png');
import JobCategory from '../JobCategory/jobCategory';
import JobDetails from '../JobDetails/jobDetails';
const Box = createBox();
const Text = createText();
const Renovation = require('../../assets/Renovation/renovation.png');
const Lighting = require('../../assets/Lighting/lighting.png');
const Contractor = require('../../assets/Contractor/contractor.png');
const PlugPoint = require('../../assets/PlugPoint/plugpoint.png');
const Aircond = require('../../assets/aircond/aircond.png');

const AllJobCategory = ({navigation, route}) => {
  return (
    <Box flex={1}>
      <Header title="Job Category" style={styles.header} />
      <KeyboardAvoidingView
        style={TypographyStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <SharedElement id={`search.1.card`}>
            <Box flexDirection="row" style={TypographyStyles.content}>
              <Search
                title={'Search'}
                value={'Search'}
                right={() => {
                  return <Image source={SearchIcon} />;
                }}
              />
            </Box>
          </SharedElement>
          <Box backgroundColor="secondary1" mt="l">
            <FlatList
              scrollEnabled={true}
              contentContainerStyle={styles.flalistConatiner}
              data={[
                {
                  Key: 1,
                  color: '#5b5dcb',
                  text: 'Renovation',
                  image: Renovation,
                },
                {Key: 2, color: '#d3dbff', text: 'Lightning', image: Lighting},
                {
                  Key: 3,
                  color: '#e7f6ec',
                  text: 'Contractor',
                  image: Contractor,
                },
                {
                  Key: 4,
                  color: '#ede1fb',
                  text: 'Plug-Point',
                  image: PlugPoint,
                },
                {
                  Key: 5,
                  color: '#f0dec1',
                  text: 'Aircond Point',
                  image: Aircond,
                },
                {
                  Key: 6,
                  color: '#f6jfd8',
                  text: 'Wooden-Works',
                  image: Aircond,
                },
              ]}
              numColumns={2}
              renderItem={({item, index}) => {
                return <JobCategory index={index} item={item} />;
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 20,
    fontFamily: fonts.medium,
  },
  hamburger: {
    resizeMode: 'contain',
    marginLeft: 20,
  },
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
});

AllJobCategory.sharedElements = route => {
  return [
    {
      id: `search.1.card`,
      animation: 'fade',
      resize: 'clip',
    },
    {
      id: `category.1.title`,
      animation: 'fade',
      resize: 'clip',
    },
  ];
};
export default AllJobCategory;
