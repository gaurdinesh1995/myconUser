import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import {Pressable, Image, ScrollView, StyleSheet, FlatList} from 'react-native';
import {Header} from '../ReusableComponents';
import {palette, size, TypographyStyles} from '../Theme/Index';
import {SharedElement} from 'react-navigation-shared-element';
import ContractorItem from '../ContractorItem/ContractorItem';
const Box = createBox();
const Text = createText();
const adds = require('../../assets/Dashboard/adds.png');
const adds1 = require('../../assets/Dashboard/adds1.png');
const company = require('../../assets/Dashboard/company.png');
const company1 = require('../../assets/ContractorProfile/review1.png');
const user = require('../../assets/Tabs/user.png');
const Location = require('../../assets/Dashboard/location.png');

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
];

const advertisement = [
  {
    image: adds,
  },
  {
    image: adds1,
  },
];

export default ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => ({
    ...state.auth.user.user,
  }));

  return (
    <Box flex={1} flexGrow={1} backgroundColor="secondary1">
      <Header
        title="Dashboard"
        left={() => {
          return <Box height={50} width={50} />;
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <Box
          flexDirection="row"
          minHeight={150}
          alignItems="center"
          backgroundColor="secondary">
          <Image resizeMode="cover" source={user} style={styles.profile} />
          <Box ml="l">
            <Text variant="primary21bold">Welcome !</Text>
            <Text variant="support216bold" marginVertical="s">
              {user?.userName}
            </Text>
            <Box flexDirection="row" alignItems="center" mt="s">
              <Image source={Location} />
              <Text ml="s" variant="primary512regular">
                Chandigarh
              </Text>
            </Box>
          </Box>
        </Box>
        <Box>
          <FlatList
            nestedScrollEnabled
            style={styles.addsList}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={advertisement}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => {
              const {image} = item;
              return (
                <Image
                  resizeMode="cover"
                  style={styles.addsItem}
                  source={image}
                />
              );
            }}
          />
        </Box>
        <Box
          marginHorizontal="l"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <Text variant="support216bold">Nearby Contractors</Text>
          <Pressable>
            {/* // onPress={() => { */}
            {/* //   navigation.navigate('NearbyContractor'); */}
            {/* // }}> */}
            <Text variant="primary12bold">View All</Text>
          </Pressable>
        </Box>
        <Box>
          <FlatList
            nestedScrollEnabled
            style={styles.contractorList}
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => {
              return (
                <ContractorItem
                  item={item}
                  onPress={() => {
                    navigation.navigate('ComingSoon');

                    // navigation.navigate('ContractorProfile', {item});
                  }}
                />
              );
            }}
          />
        </Box>
      </ScrollView>
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
  content: {flex: 1},
});
