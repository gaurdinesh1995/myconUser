import React, {useRef, useReducer} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {createBox, createText} from '@shopify/restyle';
import {TypographyStyles, fonts, palette} from '../Theme/Index';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const Location = require('../../assets/CurrentLocation/location.png');
const Box = createBox();
const Text = createText();

export default ({navigation, route}) => {
  const mapRef = useRef(null);
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      address: '',
      latitude: '37.78825',
      longitude: '-122.4324',
    },
  );
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(info => {
      const lat = info.coords.latitude;
      const long = info.coords.longitude;
      mapRef.current.animateToRegion({
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
      setState({
        latitude: lat,
        longitude: long,
      });
    });
  };
  const onRegionChange = region => {
    setState({
      region,
    });
  };
  const onRegionChangeComplete = (region, gesture) => {
    if (Platform.OS === 'android') {
      if (gesture.isGesture) {
        onRegionChange(region);
      }
    } else {
      onRegionChange(region);
    }
  };
  return (
    <Box flex={1} mt="l" backgroundColor="secondary1">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mr="l"
        marginBottom="l">
        <Text pl="l" p="m" variant="support214Regular">
          See Places near you
        </Text>
        <TouchableOpacity onPress={() => getCurrentLocation()}>
          <Image style={styles.image} source={Location} />
        </TouchableOpacity>
      </Box>
      <MapView
        ref={mapRef}
        // pitchEnabled={true}
        style={styles.mapview}
        provider="google"
        // onRegionChange={() => onRegionChange()}
        // onRegionChangeComplete={() => onRegionChangeComplete.bind(this)}
        initialRegion={{
          latitude: parseFloat(state.latitude),
          longitude: parseFloat(state.longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          draggable={true}
          onDragEnd={e => {}}
          coordinate={{
            latitude: parseFloat(state.latitude),
            longitude: parseFloat(state.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </MapView>
    </Box>
  );
};

const styles = StyleSheet.create({
  HeaderIcons: {
    resizeMode: 'contain',
    marginLeft: 20,
  },
  mapview: {flex: 1},
  image: {height: 30, width: 30},
  header: {
    fontSize: 24,
    fontFamily: fonts.bold,
    marginLeft: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
