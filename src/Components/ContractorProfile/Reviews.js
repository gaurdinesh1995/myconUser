import React, {useState, useEffect, useReducer, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {Image, StyleSheet} from 'react-native';
import {createBox, createText} from '@shopify/restyle';
import {palette, size, TypographyStyles} from '../Theme/Index';
import {Icon} from 'native-base';
import Stars from 'react-native-stars';
const Box = createBox();
const Text = createText();
const data = [];

export default ({item}) => {
  const {image, title, subTitle, date} = item;

  return (
    <Box flex={1} marginVertical="l">
      <Box marginHorizontal="l" flexDirection="row">
        <Image source={image} />
        <Box ml="l" mt="s">
          <Text variant="primary14Bold">{title}</Text>
          <Box width={100} justifyContent="flex-start" marginVertical="s">
            <Stars
              default={2.5}
              count={5}
              half={true}
              starSize={10}
              fullStar={
                <Icon
                  type="MaterialCommunityIcons"
                  name="star"
                  style={styles.icon}
                />
              }
              emptyStar={
                <Icon
                  type="MaterialCommunityIcons"
                  name="star-outline"
                  style={styles.icon}
                />
              }
              halfStar={
                <Icon
                  type="MaterialCommunityIcons"
                  name="star-half"
                  style={styles.icon}
                />
              }
            />
          </Box>
          <Box width={size.width - 30}>
            <Text
              variant="support213Medium"
              style={styles.textBox}
              numberOfLines={2}>
              {subTitle}
            </Text>
          </Box>
          <Box mt="l">
            <Text
              variant="support210bold"
              style={styles.textBox}
              numberOfLines={2}>
              {date}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  content: {flexGrow: 1},
  icon: {color: palette.tertiary4, fontSize: 20},
  textBox: {width: size.width / 1.4},
  buttonStyle: {
    height: 44,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: palette.primary2,
    width: size.width,
    marginHorizontal: 20,
  },
  text: {fontSize: 16, color: palette.tertiary2},
  eye: {height: 30, width: 30},
});
