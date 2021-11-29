import React, {useState, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {TouchableOpacity, StyleSheet} from 'react-native';
import authConstants from '../../Redux/AuthConstants';
import {createBox, createText} from '@shopify/restyle';
const Box = createBox();
const Text = createText();
export default ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <TouchableOpacity
        onPress={() => {
          dispatch({
            type: authConstants.RESET_STATE,
            user: 'data',
          });
        }}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </Box>
  );
};

const styles = StyleSheet.create({
  text: {margin: 100},
});
