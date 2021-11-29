import {createTheme} from '@shopify/restyle';
import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const size = {
  //Primary
  width: width,
  height: height,
};
export const palette = {
  //Primary
  primary: '#5B5DCB',
  primary1: '#FEC431',
  primary2: '#EAEFFF',
  primary3: '#7A869A',
  primary4: '#F6F8F9',
  primary5: '#232326',
  primary6: '#BCBCC8',
  // Secondary
  secondary: '#CED4FD',
  secondary1: '#F5F6FF',
  secondary2: '#E0E0FD',
  secondary3: '#EAEAFF',
  secondary4: '#575757',
  secondary5: '#F8F9FD',
  secondary6: '#2B1DE8',
  //Tertiary
  tertiary: '#F4F5F7',
  tertiary1: '#CCCCD5',
  tertiary2: '#172B4D',
  tertiary3: '#FDBC5A',
  tertiary4: '#FFC107',
  tertiary5: '#C3C2F8',
  //Supporting colos
  support: '#172B3D',
  support1: '#212121',
  support2: '#0F0250',
  support3: '#D80027',
  support4: '#FEC42D',
  support5: '#ACACAC',
  support6: '#ABABB5',
  support7: '#FFF',
  support8: '#000',
  support9: '#EDEDED',
};

export const TypographyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  card: {
    minHeight: 175,
    backgroundColor: 'white',
    borderRadius: 25,
    marginHorizontal: 30,
  },
});

export const fonts = {
  bold: 'Roboto-Bold',
  medium: 'Roboto-Medium',
  thin: 'Roboto-Thin',
  thinitalic: 'Roboto-ThinItalic',
  mediumItalic: 'Roboto-MediumItalic',
  regular: 'Roboto-Regular',
  italicLight: 'Roboto-LightItalic',
  italicBlack: 'Roboto-BlackItalic',
  boldItalic: 'Roboto-BoldItalic',
  italic: 'Roboto-Italic',
  black: 'Roboto-Black',
  condensedBold: 'RobotoCondensed-Bold',
};

const theme = createTheme({
  colors: {
    white: 'white',
    black: 'black',

    //Primary
    primary: palette.primary,
    primary1: palette.primary1,
    primary2: palette.primary2,
    primary3: palette.primary3,
    primary4: palette.primary4,
    primary5: palette.primary5,
    primary6: palette.primary6,
    // Secondary
    secondary: palette.secondary,
    secondary1: palette.secondary1,
    secondary2: palette.secondary2,
    secondary3: palette.secondary3,
    secondary4: palette.secondary4,
    secondary5: palette.secondary5,
    secondary6: palette.secondary6,
    //Tertiary
    tertiary: palette.tertiary,
    tertiary1: palette.tertiary1,
    tertiary2: palette.tertiary2,
    tertiary3: palette.tertiary3,
    tertiary4: palette.tertiary4,
    tertiary5: palette.tertiary5,
    //Supporting colos
    support: palette.support,
    support1: palette.support1,
    support2: palette.support2,
    support3: palette.support3,
    support4: palette.support4,
    support5: palette.support5,
    support6: palette.support6,
    support7: palette.support7,
    support8: palette.support8,
    support9: palette.support9,
  },
  spacing: {
    s: 5,
    m: 10,
    l: 20,
    xl: 25,
    xxl: 30,
    xxxl: 40,
    xxxxl: 50,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    // 10
    tertiary110bold: {
      color: 'tertiary1',
      fontFamily: fonts.bold,
      fontSize: 1,
    },
    primary10bold: {
      color: 'primary',
      fontFamily: fonts.bold,
      fontSize: 10,
    },
    support210bold: {
      color: 'support2',
      fontFamily: fonts.bold,
      fontSize: 10,
    },
    support210medium: {
      color: 'support2',
      fontFamily: fonts.medium,
      fontSize: 10,
    },
    support212bold: {
      color: 'support2',
      fontFamily: fonts.bold,
      fontSize: 12,
    },
    //12
    primary512regular: {
      color: 'primary5',
      fontFamily: fonts.regular,
      fontSize: 12,
    },
    support312regular: {
      color: 'support3',
      fontFamily: fonts.regular,
      fontSize: 12,
    },
    support412regular: {
      color: 'support4',
      fontFamily: fonts.regular,
      fontSize: 12,
    },
    support212Medium: {
      color: 'support2',
      fontFamily: fonts.medium,
      fontSize: 12,
    },
    support211regular: {
      color: 'support2',
      fontFamily: fonts.regular,
      fontSize: 11,
    },
    primary12bold: {
      color: 'primary',
      fontFamily: fonts.bold,
      fontSize: 12,
    },
    primary12medium: {
      color: 'primary',
      fontFamily: fonts.medium,
      fontSize: 12,
    },
    black12bold: {
      color: 'black',
      fontFamily: fonts.bold,
      fontSize: 12,
    },
    secondary412regular: {
      color: 'secondary4',
      fontFamily: fonts.regular,
      fontSize: 12,
    },
    secondary412medium: {
      color: 'secondary4',
      fontFamily: fonts.medium,
      fontSize: 12,
    },
    support714Bold: {
      color: 'support7',
      fontFamily: fonts.bold,
      fontSize: 14,
    },
    support712Bold: {
      color: 'support7',
      fontFamily: fonts.bold,
      fontSize: 12,
    },

    support714medium: {
      color: 'support7',
      fontFamily: fonts.medium,
      fontSize: 14,
    },
    primary612Bold: {
      color: 'primary6',
      fontFamily: fonts.bold,
      fontSize: 12,
    },
    primary612medium: {
      color: 'primary6',
      fontFamily: fonts.medium,
      fontSize: 12,
    },

    tertiary212regular: {
      color: 'tertiary2',
      fontFamily: fonts.regular,
      fontSize: 12,
    },
    //13
    support213Medium: {
      color: 'support2',
      fontFamily: fonts.medium,
      fontSize: 13,
    },
    white13Medium: {
      color: 'white',
      fontFamily: fonts.medium,
      fontSize: 13,
    },
    // 20

    primary20bold: {
      color: 'primary',
      fontFamily: fonts.bold,
      fontSize: 20,
    },
    primary312regular: {
      color: 'primary',
      fontFamily: fonts.regular,
      fontSize: 12,
    },
    primary12regular: {
      color: 'primary3',
      fontFamily: fonts.regular,
      fontSize: 12,
    },
    primary16bold: {
      color: 'primary',
      fontFamily: fonts.bold,
      fontSize: 16,
    },

    // 16
    white16Medium: {
      color: 'white',
      fontFamily: fonts.medium,
      fontSize: 16,
    },
    support12Medium: {
      color: 'support6',
      fontFamily: fonts.medium,
      fontSize: 12,
    },
    support216bold: {
      color: 'support2',
      fontFamily: fonts.bold,
      fontSize: 16,
    },
    support216medium: {
      color: 'support2',
      fontFamily: fonts.medium,
      fontSize: 16,
    },
    support212medium: {
      color: 'support2',
      fontFamily: fonts.medium,
      fontSize: 12,
    },
    support712medium: {
      color: 'support7',
      fontFamily: fonts.medium,
      fontSize: 12,
    },
    support416regular: {
      color: 'support4',
      fontFamily: fonts.regular,
      fontSize: 16,
    },
    // 14
    support114Regular: {
      color: 'support1',
      fontFamily: fonts.regular,
      fontSize: 14,
    },
    tertiary214regular: {
      color: 'tertiary2',
      fontFamily: fonts.regular,
      fontSize: 14,
    },

    primary14Bold: {
      color: 'primary',
      fontFamily: fonts.bold,
      fontSize: 14,
    },
    primary314Regular: {
      color: 'primary3',
      fontFamily: fonts.regular,
      fontSize: 14,
    },
    support214Regular: {
      color: 'support2',
      fontFamily: fonts.regular,
      fontSize: 14,
    },
    support214Bold: {
      color: 'support2',
      fontFamily: fonts.bold,
      fontSize: 14,
    },
    support214medium: {
      color: 'support2',
      fontFamily: fonts.medium,
      fontSize: 14,
    },
    support712medium: {
      color: 'support7',
      fontFamily: fonts.medium,
      fontSize: 14,
    },

    // 15
    support115Regular: {
      color: 'support1',
      fontFamily: fonts.regular,
      fontSize: 15,
    },
    support415regular: {
      color: 'support4',
      fontFamily: fonts.regular,
      fontSize: 15,
    },
    //21
    primary21bold: {
      color: 'primary',
      fontFamily: fonts.bold,
      fontSize: 21,
    },
    // 24
    tertiary224regular: {
      color: 'tertiary2',
      fontFamily: fonts.regular,
      fontSize: 24,
      lineHeight: 26,
    },
    black24bold: {
      color: 'black',
      fontFamily: fonts.bold,
      fontSize: 24,
      lineHeight: 26,
    },
    // 25
    tertiary225regular: {
      color: 'tertiary2',
      fontFamily: fonts.regular,
      fontSize: 25,
      lineHeight: 25,
    },
    support712meduim: {
      color: 'support7',
      fontFamily: fonts.medium,
      fontSize: 12,
    },
    support716medium: {
      color: 'support7',
      fontFamily: fonts.medium,
      fontSize: 16,
    },
  },
});

export type Theme = typeof theme;
export default theme;
