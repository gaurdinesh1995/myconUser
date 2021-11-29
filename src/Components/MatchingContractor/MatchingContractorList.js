import React from 'react';
import {createBox, createText} from '@shopify/restyle';
import {Pressable, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {palette, size, TypographyStyles} from '../Theme/Index';
import {SharedElement} from 'react-navigation-shared-element';
const Box = createBox();
const Text = createText();
const Location = require('../../assets/Dashboard/location.png');

export default ({item, onPress, navigation}) => {
  const {id, location, title, subTitle, image} = item;
  return (
    <Box
      style={TypographyStyles.cardShadow}
      backgroundColor="support7"
      flex={1}
      marginHorizontal="l"
      height={127}
      marginVertical="s"
      borderRadius={10}>
      <Box flexDirection="row">
        <Box alignItems="center" mt="l" justifyContent="space-between">
          <SharedElement id={`item.${id}.image`}>
            <Image style={styles.companyImage} source={image} />
          </SharedElement>
        </Box>
        <Box marginTop={'l'} justifyContent="space-between">
          <Box>
            <SharedElement id={`item.${id}.title`}>
              <Text
                style={styles.textWidth}
                variant="support216medium"
                numberOfLines={1}>
                {title}
              </Text>
            </SharedElement>
            <Text style={styles.textWidth} variant="support212medium" mt="s">
              {subTitle}
            </Text>
          </Box>
        </Box>
        <Box alignItems="center" justifyContent="flex-start" mt="xl" flex={1}>
          <Pressable
            onPress={() => navigation.navigate('AppliedContractor')}
            style={styles.AssignJobButton}>
            <Text variant="support712medium">Assign</Text>
          </Pressable>
        </Box>
      </Box>
      <TouchableOpacity style={styles.imageView}>
        <Image source={Location} style={styles.image} />
        <Text pl="m" variant="primary612medium">
          {location}
        </Text>
      </TouchableOpacity>
    </Box>
  );
};

const styles = StyleSheet.create({
  contractorList: {
    marginTop: 10,
  },
  imageView: {
    backgroundColor: palette.secondary1,
    height: 48,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  image: {marginLeft: 25, tintColor: palette.primary6},
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
  AssignJobButton: {
    marginRight: 10,
    alignSelf: 'flex-end',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.primary1,
    height: 29,
    width: 89,
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
