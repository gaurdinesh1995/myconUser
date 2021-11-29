import React, {useState, useEffect, useRef, useReducer} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
const {width} = Dimensions.get('window');
import {palette, TypographyStyles} from '../Theme/Index';

const CommonTab = props => {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      active: 0,
      xTabOne: 0,
      xTabTwo: 0,
      xTabThree: 0,
      xTabFour: 0,
      translateX: new Animated.Value(0),
      translateXTabOne: new Animated.Value(0),
      translateXTabTwo: new Animated.Value(width),
      translateXTabThree: new Animated.Value(width),
      translateY: -1000,
    },
  );

  // useEffect(() => {
  //   if (state.active === 0) {
  //     setState({active: 1});
  //   } else if (state.active === 1) {
  //     setState({active: 2});
  //   } else if (state.active === 2) {
  //     setState({active: 0});
  //   }
  // }, [state.active]);

  /**
   * @function handleSlide
   * @description it will handle slide from right to left and left to right.
   */
  const handleSlide = type => {
    let {translateX} = state;
    Animated.timing(translateX, {
      toValue: type,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const {xTabOne, xTabTwo, translateX, active, xTabThree} = state;
  const {onChangeTab, options} = props;

  return (
    <View style={styles.container}>
      <View style={styles.tabOne}>
        <Animated.View
          style={[
            active === 0 ? styles.leftCornerView : null,
            active === 1 ? styles.centerCornerView : null,
            active === 2 ? styles.rightCornerView : null,
            {
              transform: [
                {
                  translateX,
                },
              ],
            },
          ]}
        />
        <TouchableOpacity
          style={styles.Viewtwo}
          onLayout={event => {
            setState({
              xTabOne: event.nativeEvent.layout.x,
            });
          }}
          onPress={() => {
            setState({active: 0});
            handleSlide(xTabOne);
            onChangeTab(0);
          }}>
          <Text
            style={{
              color: active === 0 ? 'white' : '#2C3458',
              fontSize: 14,
            }}>
            {options[0]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Viewtwo}
          onLayout={event =>
            setState({
              xTabTwo: event.nativeEvent.layout.x,
            })
          }
          onPress={() => {
            setState({active: 1});
            // setTimeout(() => {
            handleSlide(xTabTwo);
            onChangeTab(1);
            //}, 100);
          }}>
          <Text
            style={{
              color: active === 1 ? '#fff' : '#2C3458',
              fontSize: 14,
              marginRight: 5,
            }}>
            {options[1]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Viewtwo}
          onLayout={event =>
            setState({
              xTabThree: event.nativeEvent.layout.x,
            })
          }
          onPress={() => {
            setState({active: 2});
            // setTimeout(() => {
            handleSlide(xTabThree);
            onChangeTab(2);
            //}, 100);
          }}>
          <Text
            style={{
              color: active === 2 ? '#fff' : '#2C3458',
              //fontFamily: FontFamily.medium,
              fontSize: 14,
              marginRight: 5,
            }}>
            {options[2]}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommonTab;

const styles = StyleSheet.create({
  tabOne: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    height: 48,
    position: 'relative',
    borderRadius: 8,
    marginBottom: 20,
  },
  mainTabContainer: {
    backgroundColor: 'white',
  },
  container: {flex: 1},
  appointmentView: {
    //justifyContent: "center",
    backgroundColor: '#D1D6F3',
    flex: 1,
    borderRadius: 25,
    height: 38,
    marginLeft: 30,
    borderColor: '#D6D6D6',
    borderWidth: 0.5,
  },
  mainView: {
    backgroundColor: 'red',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 1,
    marginRight: 5,
    marginLeft: 5,
  },

  container: {
    //flex: 1,
  },
  leftCornerView: {
    position: 'absolute',
    width: width / 3 - 20,
    height: '90%',
    left: 2,
    borderRadius: 20,
    backgroundColor: palette.primary,
    alignSelf: 'center',
  },
  rightCornerView: {
    position: 'absolute',
    width: width / 3 - 20,
    height: '90%',
    left: 5,

    borderRadius: 20,
    backgroundColor: palette.primary,
    alignSelf: 'center',
  },
  centerCornerView: {
    position: 'absolute',
    width: width / 3 - 20,
    height: '90%',
    left: 0,
    backgroundColor: palette.primary,
    borderRadius: 20,
    alignSelf: 'center',
    marginLeft: 5,
  },
  paddingOnly: {paddingBottom: 20},
  mainCellView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: 'red',

    borderRightWidth: 0,
    borderRadius: 25,
  },
  ViewOne: {
    //position: 'absolute',
    width: '50%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: 'green',
    borderRadius: 4,
  },
  Viewtwo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 3 - 20,
    height: '90%',
    backgroundColor: palette.tertiary5,
    borderWidth: 1,
    borderColor: palette.primary,
    borderRadius: 20,
    zIndex: -1,
  },
});
