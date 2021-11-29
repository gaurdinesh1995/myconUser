import React from 'react';
import {createBox, createText} from '@shopify/restyle';
import {Pressable, Image, StyleSheet} from 'react-native';
import {palette, size, TypographyStyles} from '../Theme/Index';
import {SharedElement} from 'react-navigation-shared-element';
const Box = createBox();
const Text = createText();
const Location = require('../../assets/Dashboard/location.png');

export default ({item, onPress}) => {
  const {id, location, title, subTitle, image} = item;
  return (
    <Pressable onPress={onPress}>
      <Box
        style={TypographyStyles.cardShadow}
        backgroundColor="support7"
        flex={1}
        marginHorizontal="l"
        height={132}
        marginVertical="m"
        flexDirection="row"
        borderRadius={10}>
        <Box
          alignItems="center"
          marginVertical={'l'}
          justifyContent="space-between">
          <SharedElement id={`item.${id}.image`}>
            <Image style={styles.companyImage} source={image} />
          </SharedElement>
          <Image style={styles.locationImage} source={Location} />
        </Box>
        <Box marginVertical={'l'} justifyContent="space-between">
          <Box>
            <SharedElement id={`item.${id}.title`}>
              <Text
                style={styles.textWidth}
                variant="support216bold"
                numberOfLines={1}>
                {title}
              </Text>
            </SharedElement>
            <Text style={styles.textWidth} variant="support214Regular" mt="s">
              {subTitle}
            </Text>
          </Box>
          <Box>
            <Text style={styles.textWidth} variant="primary612Bold" mt="s">
              {location}
            </Text>
          </Box>
        </Box>
        <Box mt="m" justifyContent="flex-start" flex={1}>
          <Pressable style={styles.AssignJobButton}>
            <Text variant="support712meduim">Assign Job</Text>
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
    marginRight: 20,
    alignSelf: 'flex-end',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.primary1,
    height: 32,
    width: size.width / 3.7,
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
