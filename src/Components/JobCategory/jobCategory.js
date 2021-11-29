import React, {useReducer} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {createText} from '@shopify/restyle';
import {fonts} from '../Theme/Index';
import styles from './styles';
const Check = require('../../assets/check/Check.png');
const Text = createText();

export default ({navigation, route, item, index, setJobCategory}) => {
  const {id, selected} = item;

  console.log('Selected Index');
  return (
    <TouchableOpacity
      onPress={() => setJobCategory(item)}
      style={[styles.jobCategory, {backgroundColor: item.color.color}]}>
      <Image style={styles.checkImage} source={selected && Check} />

      {/* <Image source={item.image} /> */}

      <Text pt="l" variant="tertiary214regular">
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};
