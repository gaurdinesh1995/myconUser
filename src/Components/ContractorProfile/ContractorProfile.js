import React, {useState, useEffect, useReducer, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {Image, ScrollView, StyleSheet, FlatList} from 'react-native';
import {createBox, createText} from '@shopify/restyle';
import {Icon} from 'native-base';
import {Button, Input, Header} from '../ReusableComponents';
import {SharedElement} from 'react-navigation-shared-element';
import {palette, size, TypographyStyles} from '../Theme/Index';
import Stars from 'react-native-stars';
import Images from './Images';
import Reviews from './Reviews';
const ContractorProfiles = require('../../assets/ContractorProfile/ContractorProfile.png');
const Check = require('../../assets/ContractorProfile/check.png');
const Box = createBox();
const Text = createText();
const data = [
  {
    id: 1,
    image: require('../../assets/ContractorProfile/profile.png'),
  },
  {
    id: 2,
    image: require('../../assets/ContractorProfile/profile2.png'),
  },
  {
    id: 3,
    image: require('../../assets/ContractorProfile/profile3.png'),
  },
  {
    id: 4,
    image: require('../../assets/ContractorProfile/profile4.png'),
  },
];
const dataR = [
  {
    id: 1,
    title: 'Micheal Berg',
    subTitle: 'Sed ut perspiciatis unde omnis iste natus error sit voluptate.',
    image: require('../../assets/ContractorProfile/review1.png'),
    date: '12-02-2021 6:36 PM',
  },
  {
    id: 2,
    title: 'John Ashle',
    subTitle: 'Sed ut perspiciatis unde omnis iste natus error sit voluptate.',
    image: require('../../assets/ContractorProfile/review2.png'),
    date: '12-02-2021 6:36 PM',
  },
  {
    id: 3,
    title: 'Sajoe',
    subTitle: 'Sed ut perspiciatis unde omnis iste natus error sit voluptate.',
    image: require('../../assets/ContractorProfile/review3.png'),
    date: '12-02-2021 6:36 PM',
  },
];

const ContractorProfile = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      image: '',
      title: '',
      id: '',
    },
  );
  let param = '';
  if (route && route.params !== undefined) {
    param = route.params.space;
  }

  useEffect(() => {
    const {params} = route;
    const {item} = params;
    if (item !== undefined) {
      const {title, image, id} = item;
      setState({
        title: title,
        image: image,
        id: id,
      });
    }
  }, []);

  return (
    <Box flex={1} backgroundColor="secondary1">
      <Header title="Contractor Profile" />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={[styles.content]}>
        <Box height={55} backgroundColor="tertiary3" />

        <Box
          position="absolute"
          justifyContent="center"
          alignItems="center"
          top={10}
          left={0}
          right={0}>
          <SharedElement id={`item.${state.id}.image`}>
            <Image
              style={styles.image}
              source={state.image !== '' ? state.image : ContractorProfiles}
            />
          </SharedElement>
        </Box>

        <Box mt="xxl" justifyContent="center" alignItems="center">
          <SharedElement id={`item.${state.id}.title`}>
            <Text pt="m" variant="primary14Bold">
              {state.title}
            </Text>
          </SharedElement>
        </Box>
        <Stars
          default={2}
          count={5}
          half={true}
          starSize={30}
          fullStar={
            <Icon
              type="MaterialCommunityIcons"
              name="star"
              style={{color: palette.tertiary4}}
            />
          }
          emptyStar={
            <Icon
              type="MaterialCommunityIcons"
              name="star-outline"
              style={{color: palette.tertiary4}}
            />
          }
          halfStar={
            <Icon
              type="MaterialCommunityIcons"
              name="star-half"
              style={{color: palette.tertiary4}}
            />
          }
        />
        <Box flexDirection="row" marginHorizontal="l" alignItems="center">
          <Box flex={1.5}>
            <Text variant="support214Bold">Service Type</Text>
          </Box>
          <Box flex={0.8}>
            <Text variant="support212Medium">Renovation</Text>
          </Box>
        </Box>
        <Box backgroundColor="secondary3" height={1} marginVertical="l" />
        <Box flexDirection="row" marginHorizontal="l">
          <Box flex={1.5}>
            <Text variant="support214Bold">No of Job Completed</Text>
          </Box>
          <Box flex={0.8}>
            <Text variant="support212Medium">86+</Text>
          </Box>
        </Box>
        <Box backgroundColor="secondary3" height={1} marginVertical="l" />
        <Box flexDirection="row" marginHorizontal="l">
          <Box flex={1}>
            <Text variant="support214Bold">Gallery</Text>
          </Box>
        </Box>
        <FlatList
          keyExtractor={(item, index) => item.id}
          style={styles.images}
          horizontal
          data={data}
          renderItem={({item}) => {
            return <Images item={item} />;
          }}
        />
        <Box
          mt="l"
          borderRadius={10}
          marginHorizontal="l"
          style={TypographyStyles.cardShadow}
          backgroundColor="white">
          <Box ml="l" marginVertical="l">
            <Text variant="support214Bold">Performance Data</Text>
          </Box>
          <Box flexDirection="row" marginHorizontal="l">
            <Box flex={1}>
              <Text variant="black12bold">Completion Speed</Text>
            </Box>
            <Box flex={1}>
              <Text variant="black12bold">Job Quality</Text>
            </Box>
          </Box>
          <Box flexDirection="row" marginHorizontal="l">
            <Box
              mt="s"
              height={44}
              backgroundColor="secondary5"
              flex={1}
              ml="s"
              alignItems="center"
              justifyContent="space-between"
              flexDirection="row">
              <Box
                marginHorizontal="s"
                flex={1}
                alignItems="center"
                justifyContent="space-between"
                flexDirection="row">
                <Text variant="secondary412regular">Fast</Text>
                <Image source={Check} />
              </Box>
            </Box>
            <Box
              mt="s"
              height={44}
              backgroundColor="secondary5"
              flex={1}
              ml="s"
              alignItems="center"
              justifyContent="space-between"
              flexDirection="row">
              <Box
                marginHorizontal="s"
                flex={1}
                alignItems="center"
                justifyContent="space-between"
                flexDirection="row">
                <Text variant="secondary412regular">Average</Text>
                <Image source={Check} />
              </Box>
            </Box>
          </Box>
          <Box flexDirection="row" marginHorizontal="l">
            <Box flex={1}>
              <Text variant="black12bold">Completion</Text>
            </Box>
            <Box flex={1}>
              <Text variant="black12bold">Client Recommendation</Text>
            </Box>
          </Box>
          <Box flexDirection="row" marginHorizontal="l">
            <Box
              mt="s"
              height={44}
              backgroundColor="secondary5"
              flex={1}
              ml="s"
              alignItems="center"
              justifyContent="space-between"
              flexDirection="row">
              <Box
                marginHorizontal="s"
                flex={1}
                alignItems="center"
                justifyContent="space-between"
                flexDirection="row">
                <Text variant="secondary412regular">Good</Text>
                <Image source={Check} />
              </Box>
            </Box>
            <Box
              mt="s"
              height={44}
              backgroundColor="secondary5"
              flex={1}
              ml="s"
              alignItems="center"
              justifyContent="space-between"
              flexDirection="row">
              <Box
                marginHorizontal="s"
                flex={1}
                alignItems="center"
                justifyContent="space-between"
                flexDirection="row">
                <Text variant="secondary412regular">Yes</Text>
                <Image source={Check} />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box backgroundColor="secondary3" height={1} marginVertical="l" />
        <Text pl="xl" variant="support214Bold">
          Reviews
        </Text>
        <FlatList
          keyExtractor={(item, index) => item.id}
          style={styles.flatlist}
          nestedScrollEnabled={true}
          data={dataR}
          renderItem={({item}) => {
            return <Reviews item={item} />;
          }}
        />
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  images: {marginLeft: 10, marginTop: 10, flexGrow: 0, height: 100},
  image: {height: 80, width: 80},
  flatlist: {marginBottom: 30},
});

ContractorProfile.sharedElements = route => {
  const {item} = route.params;
  const {id} = item;
  return [
    {
      id: `item.${id}.image`,
      animation: 'move',
      resize: 'clip',
    },
    {
      id: `item.${id}.title`,
      animation: 'fade',
      resize: 'clip',
    },
  ];
};
export default ContractorProfile;
