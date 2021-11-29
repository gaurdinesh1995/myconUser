import React, {useState} from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {createBox, createText} from '@shopify/restyle';
import styles from './styles';
const Text = createText();
const Box = createBox();
const Check = require('../../assets/BlueTick/check.png');

export default ({navigation, route, item, index, setPropertySelectId}) => {
  const {id, selected} = item;

  return (
    <Box style={[styles.jonDetails]}>
      <TouchableOpacity
        onPress={() => setPropertySelectId(item)}
        style={styles.propertSize}>
        <Image source={selected && Check} />
      </TouchableOpacity>

      <Text p="m" variant="tertiary214regular">
        {item.area}
      </Text>
    </Box>
  );
};
