import React, {useEffect, useReducer} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import {createBox, createText} from '@shopify/restyle';
import {Button, Header} from '../ReusableComponents';
import {TypographyStyles, fonts} from '../Theme/Index';
import JobMaterial from '../jobMaterial/jobMaterial';
import PropertySize from '../PropertySize/PropertySize';
import WiringType from '../WiringType/WiringType';
import {
  getJobMaterialListId,
  getMaterialList,
  getPropertyList,
} from '../Services/PostJobs';
import {PostJobConstants} from '../../Redux';
import {useSelector, useDispatch} from 'react-redux';
const Box = createBox();
const Text = createText();
const Inwall = require('../../assets/WiringTypes/inwall.png');
const Exposed = require('../../assets/WiringTypes/exposed.png');

const wiringType = [
  {Key: 1, text: 'Inwall', image: Inwall, selected: false},
  {Key: 2, text: 'Exposed', image: Exposed, selected: false},
];
export default ({navigation, route}) => {
  const dispatch = useDispatch();

  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      materialList: {},
      propertyList: {},
      wiring: {},
    },
  );
  const categoryList = useSelector(state => ({
    ...state.job,
    // ...state.auth.user.user,
  }));
  console.log({categoryList});
  const {jobCategory} = categoryList;

  useEffect(() => {
    MaterialList();
    PropertyList();
    getWiringType();
  }, []);

  const MaterialList = () => {
    const {jobdetails} = categoryList;
    const Id = jobdetails.id;
    getJobMaterialListId(Id)
      .then(response => {
        const temp = [];
        let tempArr = [];
        const {data} = response;
        const {MaterialsList} = data;
        if (MaterialsList.length > 0) {
          tempArr = MaterialsList.map((element, index) => {
            let obj = element;
            if (index === 0) {
              obj.selected = true;
            } else {
              obj.selected = false;
            }
            return obj;
          });
          const obj = tempArr.find(element => {
            return element.selected;
          });
          temp.push(obj);
          dispatch({type: PostJobConstants.MATERIAL_LIST, materiallist: temp});
        }
        console.log({temp});
        setState({materialList: tempArr});
        console.log({response});
      })
      .catch(error => {
        console.log({error});
      });
  };
  const PropertyList = () => {
    getPropertyList()
      .then(response => {
        let tempArr = [];
        const {data} = response;
        const {propertyList} = data;
        if (propertyList.length > 0) {
          tempArr = propertyList.map((element, index) => {
            let obj = element;
            if (index === 0) {
              obj.selected = true;
              dispatch({
                type: PostJobConstants.PROPERTY_LIST,
                propertylist: obj,
              });
            } else {
              obj.selected = false;
            }
            return obj;
          });
        }
        setState({propertyList: tempArr});
        console.log({response});
      })
      .catch(error => {
        console.log({error});
      });
  };

  const setMaterialSelectId = value => {
    const id = value.id;

    const MaterialList = state.materialList.map(element => {
      let obj = element;
      if (obj.id === id) {
        if (obj.selected) {
          obj.selected = false;
        } else {
          obj.selected = true;
        }
      }
      return obj;
    });
    console.log({MaterialList});
    let arr = [];
    const List = MaterialList.map(e => {
      let obj1 = e;
      let {selected} = obj1;
      if (selected) {
        return arr.push(obj1);
      }
    });
    console.log({arr});
    dispatch({type: PostJobConstants.MATERIAL_LIST, materiallist: arr});
    setState({MaterialList});
  };

  const setPropertySelectId = value => {
    const id = value.id;

    const propertyList = state.propertyList.map(element => {
      let obj = element;
      if (obj.id === id) {
        if (obj.selected) {
          obj.selected = false;
        } else {
          obj.selected = true;
        }
      } else {
        obj.selected = false;
      }
      return obj;
    });
    console.log({propertyList});
    setState({propertyList});
    const List = state.propertyList.map(e => {
      let obj1 = e;
      let {selected} = obj1;
      if (selected) {
        dispatch({type: PostJobConstants.PROPERTY_LIST, propertylist: obj1});
      }
    });
  };

  const getWiringType = () => {
    let tempArr = [];
    if (wiringType.length > 0) {
      tempArr = wiringType.map((element, index) => {
        let obj = element;
        if (index === 0) {
          obj.selected = true;
          dispatch({
            type: PostJobConstants.WIRING,
            wiring: obj,
          });
        } else {
          obj.selected = false;
        }
        return obj;
      });
    }
    setState({wiring: tempArr});
  };

  const setWiringType = value => {
    const key = value.Key;
    const wiringTypes = wiringType.map(element => {
      console.log({element});
      let obj = element;
      if (obj.Key === key) {
        if (obj.selected) {
          obj.selected = false;
        } else {
          obj.selected = true;
        }
      } else {
        obj.selected = false;
      }
      return obj;
    });
    setState({wiring: wiringTypes});
  };

  console.log('STATE', state.wiring);
  return (
    <Box flex={1}>
      <Header title="Post Jobs" style={styles.header} />
      <KeyboardAvoidingView
        style={TypographyStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <Box backgroundColor="secondary1" mt="s">
            <Text p="l" pl="xl" variant="primary16bold">
              Lighting Material
            </Text>
            <FlatList
              scrollEnabled={true}
              contentContainerStyle={styles.flatlistContainer}
              data={state.materialList}
              renderItem={({item, index}) => {
                return (
                  <JobMaterial
                    setMaterialSelectId={value => setMaterialSelectId(value)}
                    index={index}
                    item={item}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
            <Text p="l" pl="xl" variant="primary16bold">
              Property Size
            </Text>
            <FlatList
              scrollEnabled={true}
              contentContainerStyle={styles.flatlistContainer}
              data={state.propertyList}
              numColumns={2}
              renderItem={({item, index}) => {
                return (
                  <PropertySize
                    setPropertySelectId={value => setPropertySelectId(value)}
                    index={index}
                    item={item}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />

            <Text p="l" pl="xl" variant="primary16bold">
              Type of Wiring
            </Text>
            <FlatList
              scrollEnabled={true}
              contentContainerStyle={styles.flatlistContainer}
              data={state.wiring}
              numColumns={3}
              renderItem={({item, index}) => {
                return (
                  <WiringType
                    setWiringType={value => setWiringType(value)}
                    index={index}
                    item={item}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />

            <Button
              buttonStyle={styles.button}
              label="Proceed"
              onPress={() => navigation.navigate('JobTarget')}
            />
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 20,
    fontFamily: fonts.medium,
  },
  hamburger: {
    resizeMode: 'contain',
    marginLeft: 20,
  },
  header: {
    fontSize: 24,
    fontFamily: fonts.bold,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  flatlistContainer: {
    marginHorizontal: 20,
  },
});
