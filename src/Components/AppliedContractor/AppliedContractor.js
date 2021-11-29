import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import {Pressable, Image, StyleSheet, FlatList} from 'react-native';
import {Header, Search} from '../ReusableComponents';
import {palette, size} from '../Theme/Index';
import AppliedContractorList from './AppliedContractorList';
const Box = createBox();
const Text = createText();
const Lighting = require('../../assets/jobhistory/lightning.png');
const Contractor = require('../../assets/jobhistory/Contractor.png');
const Renovation = require('../../assets/jobhistory/Renovation.png');
const Plugpoint = require('../../assets/jobhistory/Plugpoint.png');
const SearchIcon = require('../../assets/Search/search.png');

const data = [
  {
    id: 1,
    image: Lighting,
    title: 'Alex Lion',
    subTitle: 'Plumbing',
    location: '14 May, 2021',
  },
  {
    id: 2,
    image: Contractor,
    title: 'Tommy Lois',
    subTitle: 'Plumbing',
    location: '14 May, 2021',
  },
  {
    id: 3,
    image: Renovation,
    title: 'Leo Flix',
    subTitle: 'Plumbing',
    location: '14 May, 2021',
  },
  {
    id: 4,
    image: Plugpoint,
    title: 'Jack Karlo',
    subTitle: 'Plumbing',
    location: '14 May, 2021',
  },
  {
    id: 5,
    image: Renovation,
    title: 'Peri sens',
    subTitle: 'Plumbing',
    location: '14 May, 2021',
  },
  {
    id: 6,
    image: Plugpoint,
    title: 'Hilton',
    subTitle: 'Plumbing',
    location: '14 May, 2021',
  },
];

export default ({navigation}) => {
  return (
    <Box flex={1} backgroundColor="secondary1">
      <Header title="Applied Contractor" />

      <Box backgroundColor="secondary1">
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => {
            return <AppliedContractorList item={item} />;
          }}
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  contractorList: {
    marginTop: 10,
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
