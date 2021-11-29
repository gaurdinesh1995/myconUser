import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import {Pressable, Image, StyleSheet, FlatList} from 'react-native';
import {Header, Search} from '../ReusableComponents';
import {palette, size} from '../Theme/Index';
import ContractorItem from '../ContractorItem/ContractorItem';
import Filter from './Filter';
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
const Box = createBox();
const company = require('../../assets/Dashboard/company.png');
const company1 = require('../../assets/ContractorProfile/review1.png');
const filterIcon = require('../../assets/filter/filter.png');
const SearchIcon = require('../../assets/Search/search.png');

const data = [
  {
    id: 1,
    image: company,
    title: 'Segwitz Sdn Bhd',
    subTitle: 'Plumbing',
    location: '2 KM near from my place',
  },
  {
    id: 2,
    image: company1,
    title: 'Perameter Ltd',
    subTitle: 'Woodworks',
    location: '2 KM near from my place',
  },
  {
    id: 3,
    image: company1,
    title: 'Perameter Ltd',
    subTitle: 'Woodworks',
    location: '2 KM near from my place',
  },
  {
    id: 4,
    image: company1,
    title: 'Perameter Ltd',
    subTitle: 'Woodworks',
    location: '2 KM near from my place',
  },
  {
    id: 5,
    image: company1,
    title: 'Perameter Ltd',
    subTitle: 'Woodworks',
    location: '2 KM near from my place',
  },
  {
    id: 6,
    image: company1,
    title: 'Perameter Ltd',
    subTitle: 'Woodworks',
    location: '2 KM near from my place',
  },
  {
    id: 7,
    image: company1,
    title: 'Perameter Ltd',
    subTitle: 'Woodworks',
    location: '2 KM near from my place',
  },
  {
    id: 8,
    image: company1,
    title: 'Perameter Ltd',
    subTitle: 'Woodworks',
    location: '2 KM near from my place',
  },
];

export default ({navigation}) => {
  //const translateY = new Animated.Value(300);
  const state = new Value(State.UNDETERMINED);
  const isOpen = new Value(0);
  const transation = withTransition(isOpen);

  const translateY = interpolate(transation, {
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const zIndex = interpolate(transation, {
    inputRange: [0, 299, 300],
    outputRange: [-1, 1, 0],
  });
  useCode(
    () => cond(eq(state, State.END), set(isOpen, not(isOpen))),
    [state, isOpen],
  );

  const gestureHandler = {
    onHandlerStateChange: Animated.event([
      {
        nativeEvent: {state},
      },
    ]),
  };

  return (
    <Box flex={1} backgroundColor="secondary1">
      <Header
        title="Nearby Contractor"
        right={() => {
          return (
            <TapGestureHandler {...gestureHandler}>
              <Animated.View onPress={() => {}}>
                <Image source={filterIcon} />
              </Animated.View>
            </TapGestureHandler>
          );
        }}
      />
      <Box flexDirection="row" backgroundColor="white" paddingBottom="l">
        <Search
          title={'Search'}
          placeholder="Search"
          placeholderColor="blackF5F6FF"
          right={() => {
            return <Image source={SearchIcon} />;
          }}
        />
      </Box>
      <Box backgroundColor="secondary1">
        <FlatList
          style={styles.contractorList}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => {
            const {image, title, subTitle, location, id} = item;
            return (
              <ContractorItem
                item={item}
                onPress={() => {
                  navigation.navigate('ContractorProfile', {item});
                }}
              />
            );
          }}
        />
      </Box>
      <Filter
        translateY={translateY}
        gestureHandler={gestureHandler}
        zIndex={zIndex}
      />
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
