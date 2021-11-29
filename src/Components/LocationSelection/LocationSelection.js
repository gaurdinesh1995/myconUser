import React, {useEffect, useReducer, useRef} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import {createBox, createText} from '@shopify/restyle';
import {Button, Header, Search} from '../ReusableComponents';
import {TypographyStyles, fonts, palette, size} from '../Theme/Index';
import {useDispatch} from 'react-redux';
import {PostJobConstants} from '../../Redux';

const Cross = require('../../assets/Cross/cross.png');
const Check = require('../../assets/SimpleCheck/check.png');
const Box = createBox();
const Text = createText();
const SearchIcon = require('../../assets/Search/search.png');

export default ({navigation, route}) => {
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      address: '',
      latitude: '37.78825',
      longitude: '-122.4324',
      state: '',
    },
  );

  /**
   * @func useEffect
   * @description initial load when component mount and get geocoder and set address if there is any.
   */
  useEffect(() => {
    Geocoder.init('AIzaSyBBV2GKpgp-m6xhxP62n2HlqIpwtOG1RX8');
    const {params} = route;
    if (params !== undefined) {
      const {selectedAddress} = params;
      setState({address: selectedAddress});
    }
  }, []);

  /**
   * @func useEffect
   * @description it will set the address and set in map when ever address state changes.
   */
  useEffect(() => {
    if (state.address !== '') {
      Geocoder.from(state.address)
        .then(json => {
          var location = json.results[0].geometry.location;
          if (location && location.lat !== undefined) {
            setState({
              latitude: location.lat,
              longitude: location.lng,
            });
            setTimeout(() => {
              if (mapRef.current !== null) {
                mapRef.current.animateToRegion({
                  latitude: location.lat,
                  longitude: location.lng,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                });
              }
            }, 600);
          }
        })
        .catch(error => console.warn(error));
    }
    dispatch({
      type: PostJobConstants.LOCATION,
      location: state.address,
    });
  }, [state.address]);

  /**
   * @func getCurrentLocation
   * @description it will get the current location and set in map.
   */
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(info => {
      const lat = info.coords.latitude;
      const long = info.coords.longitude;
      getLocationFromLatLong(lat, long);
    });
  };

  /**
   * @function getLocationFromLatLong
   * @param {*} lat
   * @param {*} long
   * @description it will get lat,long and return location.
   */
  const getLocationFromLatLong = (lat, long) => {
    Geocoder.from(lat, long)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        mapRef.current.animateToRegion({
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
        setState({
          address: addressComponent,
          latitude: lat,
          longitude: long,
        });
      })
      .catch(error => console.warn(error));
  };

  /**
   * @function onRegionChange
   * @param {*} region
   * @description it changes the regison of map.
   */
  const onRegionChange = region => {
    setState({
      region,
    });
  };

  /**
   * @function onRegionChangeComplete
   * @param {*} region
   * @param {*} gesture
   * @description it changes the region again.
   */
  const onRegionChangeComplete = (region, gesture) => {
    if (Platform.OS === 'android') {
      if (gesture.isGesture) {
        onRegionChange(region);
      }
    } else {
      onRegionChange(region);
    }
  };

  /**
   * @function address
   * @param {*} data
   * @param {*} latLong
   * @description its a callback from search screen and set address in map.
   */
  const address = (data, latLong) => {
    if (latLong !== undefined && latLong.lat !== undefined) {
      mapRef.current.animateToRegion({
        latitude: latLong.lat,
        longitude: latLong.lng,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
      setState({
        latitude: latLong.lat,
        longitude: latLong.lng,
      });
    }
    setState({
      address: data.address_line_1,
    });
  };

  console.log('Address', state.address);
  return (
    <Box flex={1}>
      <Header
        title="Selection Location"
        style={styles.header}
        renderLeft={() => {
          return <Image source={Cross} style={styles.HeaderIcons} />;
        }}
        renderRight={() => {
          return <Image source={Check} style={styles.HeaderIcons} />;
        }}
      />
      <TouchableOpacity
        style={styles.searching}
        onPress={() => {
          navigation.navigate('Search', {address: address});
        }}>
        <Box marginVertical="l" pointerEvents="none" flexDirection="row">
          <Search
            ViewStyle={styles.textfieldView}
            style={styles.textfield}
            title={'Search'}
            value={'Search'}
            rightStyle={styles.searchRight}
            right={() => {
              return <Image source={SearchIcon} />;
            }}
          />
        </Box>
        <Box ml="m">
          <TouchableOpacity
            onPress={() => {
              getCurrentLocation();
            }}>
            <Image
              source={require('../../assets/selectionLocation/compass.png')}
            />
          </TouchableOpacity>
        </Box>
      </TouchableOpacity>
      {state.latitude !== null ? (
        <MapView
          ref={mapRef}
          pitchEnabled={true}
          style={TypographyStyles.content}
          provider="google"
          onRegionChange={() => onRegionChange()}
          onRegionChangeComplete={() => onRegionChangeComplete.bind(this)}
          initialRegion={{
            latitude: parseFloat(state.latitude),
            longitude: parseFloat(state.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            draggable={true}
            onDragEnd={e => {
              getLocationFromLatLong(
                e.nativeEvent.coordinate.latitude,
                e.nativeEvent.coordinate.longitude,
              );
            }}
            coordinate={{
              latitude: parseFloat(state.latitude),
              longitude: parseFloat(state.longitude),
            }}>
            <Image
              source={require('../../assets/selectionLocation/marker.png')}
            />
          </Marker>
        </MapView>
      ) : null}

      <Box
        zIndex={99}
        position="absolute"
        bottom={100}
        left={0}
        right={0}
        marginHorizontal="l"
        backgroundColor="white"
        borderRadius={10}
        height={80}
        flexDirection="row">
        <Box justifyContent="center" alignItems="center" ml="l">
          <Image
            source={require('../../assets/selectionLocation/marker.png')}
          />
        </Box>
        <Box justifyContent="center" ml="m">
          <Box width={size.width / 1.6}>
            <Text variant="support115Regular" numberOfLines={2}>
              {state.address}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  textfieldView: {
    width: size.width - 80,
  },
  textfield: {width: size.width - 80, marginHorizontal: 0},
  searchRight: {right: 20},
  searcing: {
    position: 'absolute',
    top: 100,
    right: 0,
    width: size.width,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
    flexDirection: 'row',
  },
  HeaderIcons: {
    resizeMode: 'contain',
    marginLeft: 20,
  },
  header: {
    fontSize: 24,
    fontFamily: fonts.bold,
    marginLeft: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
