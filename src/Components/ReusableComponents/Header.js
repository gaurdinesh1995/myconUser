import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {createBox, createText} from '@shopify/restyle';
import {TouchableOpacity, Image, Dimensions, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {size} from '../Theme/Index';
const backIcon = require('../../assets/Back/Back.png');
const Box = createBox();
const Text = createText();

const Header = ({left, right, title, back, backgroundColor, style}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <Box
      backgroundColor={backgroundColor ? backgroundColor : 'white'}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      width={size.width}
      style={{
        paddingTop: insets.top,
        height: insets.top === 0 ? 70 : 100,
      }}>
      {back ? (
        <Box height={50} width={50} />
      ) : left() ? (
        left()
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack(null);
          }}>
          <Image source={backIcon} style={styles.image} />
        </TouchableOpacity>
      )}
      <Text variant="black24bold" style={style}>
        {title}
      </Text>
      <Box mr="l">{right() ? right() : <Box width={50} height={50} />}</Box>
    </Box>
  );
};
export default Header;

Header.propTypes = {
  back: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  left: PropTypes.func,
  right: PropTypes.func,
  title: PropTypes.string,
};

Header.defaultProps = {
  back: false,
  style: {},
  left: () => {},
  right: () => {},
  title: '',
};

const styles = StyleSheet.create({
  image: {marginHorizontal: 25, marginVertical: 15},
});
