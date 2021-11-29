import React from 'react';
import {StyleSheet} from 'react-native';
import {createBox, createText} from '@shopify/restyle';
import {palette, size, TypographyStyles} from '../Theme/Index';
const Box = createBox();
const Text = createText();

export default ({navigation, route}) => {
  return (
    <Box alignItems="center" justifyContent="center" flex={1}>
      <Text variant="primary16bold">Coming Soon</Text>
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
