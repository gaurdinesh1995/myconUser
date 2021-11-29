import React, {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {createBox, createText} from '@shopify/restyle';
import styles from './styles';
const Check = require('../../assets/BlueTick/check.png');
const Text = createText();
const Box = createBox();
const MaterialImg = require('../../assets/MaterialImg/materialImg.png');
export default ({navigation, route, item, index, setMaterialSelectId}) => {
  const {id, selected} = item;
  return (
    <TouchableOpacity
      onPress={() => setMaterialSelectId(item)}
      style={[styles.material]}>
      <Box
        ml="m"
        borderRadius={12}
        height={44}
        width={45}
        alignItems="center"
        justifyContent="center"
        backgroundColor="primary2">
        <Image style={styles.materialImg} source={MaterialImg} />
      </Box>
      <Text pl="l" variant="tertiary214regular">
        {item.name}
      </Text>
      <Image style={styles.checkImage} source={selected && Check} />
    </TouchableOpacity>
  );
};
