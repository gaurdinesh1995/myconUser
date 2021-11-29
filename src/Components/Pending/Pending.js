import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import {Pressable, Image, StyleSheet, FlatList} from 'react-native';
import {Header, Search} from '../ReusableComponents';
import {palette, size} from '../Theme/Index';
import ContractorItem from '../ContractorItem/ContractorItem';
import Animated, {
  Value,
  useCode,
  cond,
  eq,
  set,
  not,
  interpolate,
} from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import {withTransition} from 'react-native-redash/lib/module/v1';
import PendingTabBarList from './PendingTabBarList';
const Box = createBox();
const Lighting = require('../../assets/jobhistory/lightning.png');
const Contractor = require('../../assets/jobhistory/Contractor.png');
const Renovation = require('../../assets/jobhistory/Renovation.png');
const Plugpoint = require('../../assets/jobhistory/Plugpoint.png');

const data = [
  {
    id: 1,
    image: Lighting,
    title: 'Lighting',
    subTitle: 'Lighting Extension',
    location: 'Assign Contract',
  },
  {
    id: 2,
    image: Contractor,
    title: 'Contractor',
    subTitle: 'Lighting Extension',
    location: 'Assign Contract',
  },
  {
    id: 3,
    image: Renovation,
    title: 'Renovation',
    subTitle: 'Lighting Extension',
    location: 'Assign Contract',
  },
  {
    id: 4,
    image: Plugpoint,
    title: 'Plugpoint',
    subTitle: 'Lighting Extension',
    location: 'Assign Contract',
  },
  {
    id: 5,
    image: Renovation,
    title: 'Renovation',
    subTitle: 'Lighting Extension',
    location: 'Assign Contract',
  },
  {
    id: 6,
    image: Plugpoint,
    title: 'Plugpoint',
    subTitle: 'Lighting Extension',
    location: 'Assign Contract',
  },
  {
    id: 7,
    image: Renovation,
    title: 'Renovation',
    subTitle: 'Lighting Extension',
    location: 'Assign Contract',
  },
  {
    id: 8,
    image: Plugpoint,
    title: 'Plugpoint',
    subTitle: 'Lighting Extension',
    location: 'Assign Contract',
  },
];

export default ({navigation}) => {
  return (
    <Box flex={1} backgroundColor="secondary1">
      <Box backgroundColor="secondary1">
        <FlatList
          style={styles.contractorList}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => {
            const {image, title, subTitle, location, id} = item;
            return (
              <PendingTabBarList
                item={item}
                navigation={navigation}
                onPress={() => {
                  navigation.navigate('JobComplete', {item});
                }}
              />
            );
          }}
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  contractorList: {
    marginTop: 60,
  },
  locationImage: {
    borderRadius: 10,
    tintColor: palette.primary6,
    marginHorizontal: 20,
  },
  companyImage: {
    borderRadius: 10,
    marginHorizontal: 20,
  },
  addsItem: {
    borderRadius: 10,
    height: 150,
    width: size.width - 60,
    marginHorizontal: 10,
  },
  addsList: {
    flexGrow: 0,
    height: 160,
    marginTop: 10,
  },
  textWidth: {width: size.width / 3},
  AssignJobButton: {
    marginRight: 20,
    alignSelf: 'flex-end',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.primary1,
    height: 42,
    width: size.width / 3,
  },
  profile: {
    tintColor: palette.primary,
    marginLeft: 20,
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 6,
    borderColor: 'white',
  },
});
