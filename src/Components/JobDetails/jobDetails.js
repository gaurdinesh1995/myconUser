import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {createText} from '@shopify/restyle';
import {fonts} from '../Theme/Index';
import styles from './styles';
const Text = createText();

export default ({navigation, route, item, index, setJobList}) => {
  const {id, selected} = item;

  return (
    <TouchableOpacity
      onPress={() => setJobList(item)}
      style={[
        styles.jonDetails,
        {
          borderWidth: selected ? 1 : 0,
          borderColor: selected && '#5b5dcb',
        },
      ]}>
      <Text p="m" variant="tertiary212regular">
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};
