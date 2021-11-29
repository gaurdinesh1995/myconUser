import React, {useReducer} from 'react';
import {useDispatch} from 'react-redux';
import {createBox, createText} from '@shopify/restyle';
import {Pressable, Image, StyleSheet, FlatList} from 'react-native';
import {Header, Search} from '../ReusableComponents';
import {palette, size} from '../Theme/Index';
import Animated from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
const Box = createBox();
const Text = createText();
const data = [
  {
    id: 1,
    title: 'Lighting',
    selected: false,
  },
  {
    id: 2,
    title: 'Renovation Contractor',
    selected: false,
  },
  {
    id: 3,
    title: 'Plug Point',
    selected: false,
  },
  {
    id: 4,
    title: 'Aircond Point',
    selected: false,
  },
];
export default ({navigation, translateY, gestureHandler, zIndex}) => {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      data: data,
    },
  );
  return (
    <>
      <TapGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            backgroundColor: '#5B5DCB88',
            zIndex,
          }}
        />
      </TapGestureHandler>
      <Animated.View
        style={[
          styles.bottomSheet,
          {
            transform: [
              {
                translateY: translateY,
              },
            ],
          },
        ]}>
        <Box mt="l" ml="l">
          <Text variant="support216bold">Job Category</Text>
        </Box>
        <Box flex={1} justifyContent="center" alignItems="center" mt="l">
          <FlatList
            style={styles.flatlist}
            data={state.data}
            numColumns={2}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => {
              const {title, selected} = item;
              return (
                <TapGestureHandler {...gestureHandler}>
                  <Animated.View>
                    <Box
                      marginVertical="m"
                      mr="m"
                      borderRadius={10}
                      height={34}
                      backgroundColor={selected ? 'primary' : 'secondary1'}
                      width={size.width / 2 - 20}
                      justifyContent="center">
                      <Text
                        ml="m"
                        variant={
                          selected ? 'white13Medium' : 'support213Medium'
                        }>
                        {title}
                      </Text>
                    </Box>
                  </Animated.View>
                </TapGestureHandler>
              );
            }}
          />
        </Box>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: size.width,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 25,
    alignSelf: 'center',
    zIndex: 100,
  },
  flatlist: {flexGrow: 0, height: 200},
});
