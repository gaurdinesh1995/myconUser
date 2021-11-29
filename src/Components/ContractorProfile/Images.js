import React, {useState, useEffect, useReducer, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {Image, StyleSheet} from 'react-native';
import {createBox, createText} from '@shopify/restyle';
import {palette, size, TypographyStyles} from '../Theme/Index';

const Box = createBox();
const Text = createText();
const data = [];

export default ({item}) => {
  const {image} = item;

  return (
    <Box flex={1} marginHorizontal="s">
      <Image source={image} />
    </Box>
  );
};

const styles = StyleSheet.create({
  content: {flexGrow: 1},
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
