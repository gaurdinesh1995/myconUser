import React from 'react';
import {createBox, createText} from '@shopify/restyle';
import {Pressable, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {palette, size, TypographyStyles} from '../Theme/Index';
import {SharedElement} from 'react-navigation-shared-element';
import {NavigationContainer} from '@react-navigation/native';
const Box = createBox();
const Text = createText();
const Location = require('../../assets/Dashboard/location.png');

export default ({item, onPress, navigation}) => {
  const {id, location, title, subTitle, image} = item;
  return (
    <Pressable>
      <Box
        style={TypographyStyles.cardShadow}
        backgroundColor="support7"
        flex={1}
        marginHorizontal="l"
        height={76}
        marginVertical="s"
        flexDirection="row"
        borderRadius={10}>
        <Box alignItems="center" justifyContent="center">
          <SharedElement id={`item.${id}.image`}>
            <Image style={styles.companyImage} source={image} />
          </SharedElement>
        </Box>
        <Box mt={'s'} justifyContent="center">
          <Box>
            <SharedElement id={`item.${id}.title`}>
              <Text
                style={styles.textWidth}
                variant="support216medium"
                numberOfLines={1}>
                {title}
              </Text>
            </SharedElement>
            <Text
              style={styles.textWidth}
              variant="support212medium"
              paddingVertical="s">
              {subTitle}
            </Text>
          </Box>
          <TouchableOpacity>
            <Text style={styles.textWidth} variant="support210medium">
              {location}
            </Text>
          </TouchableOpacity>
        </Box>
        <Box justifyContent="center" flex={1}>
          <Pressable style={styles.AssignJobButton}>
            <Text variant="support712medium">Assign Job</Text>
          </Pressable>
        </Box>
      </Box>
    </Pressable>
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
