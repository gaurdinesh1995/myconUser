import React, {useState} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {createBox, createText} from '@shopify/restyle';
const Text = createText();
const Box = createBox();
import {palette} from '../Theme/Index';

export default ({navigation, route, item, index, setWiringType}) => {
  const {id, selected} = item;

  return (
    <TouchableOpacity
      onPress={() => setWiringType(item)}
      style={[
        styles.jonDetails,
        {
          borderWidth: selected ? 1 : 0,
          borderColor: selected && '#5b5dcb',
        },
      ]}>
      <Text p="m" variant="tertiary214regular">
        {item.text}
      </Text>
      {/*NEED TO IMPLEMENT IMAGE HERE STILL ITS PENDING */}
      <Image source={item.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  jonDetails: {
    flex: 0.33,
    marginVertical: 5,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: palette.primary2,
    borderRadius: 8,
  },
});
