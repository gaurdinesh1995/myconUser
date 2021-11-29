import React, {useReducer, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import {createBox, createText} from '@shopify/restyle';
import {Button, Header, Search} from '../ReusableComponents';
import {TypographyStyles, fonts, palette} from '../Theme/Index';
const BackIcon = require('../../assets/Back/back1.png');
const Box = createBox();
const Text = createText();
const Location = require('../../assets/location/location.png');
const ProfileImg = require('../../assets/profile/ProfilePicture.png');
import {useSelector, useDispatch} from 'react-redux';
import {createJob} from '../Services/PostJobs';
import {AuthConstants} from '../../Redux';

export default ({navigation, route}) => {
  const dispatch = useDispatch();

  const categoryList = useSelector(state => ({
    ...state.job,
    // ...state.auth.user.user,
  }));
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      materialId: '',
      quantity: '',
      price: '',
      name: '',
    },
  );
  console.log('List', categoryList);
  const {
    date,
    jobCategory,
    jobdetails,
    materiallist,
    propertylist,
    location,
    wiring,
  } = categoryList;

  useEffect(() => {
    materialPrice();
  }, []);

  const materialPrice = () => {
    if (materiallist.length > 1) {
      let arr = [];
      let arrName = [];
      materiallist.map(e => {
        return arr.push(e.price);
      });
      let Add = eval(arr.join('+'));
      setState({price: Add});
      materiallist.map(e => {
        return arrName.push(e.name);
      });
      const nameJoin = arrName.join(' , ');
      setState({name: nameJoin});
      materiallist.map(e => {
        return setState({materialId: e.job_type_id});
      });

      setState({quantity: materiallist.length});
    } else {
      setState({
        price: materiallist[0].price,
        name: materiallist[0].name,
      });
    }
  };

  console.log('STATE', state);
  const Price = Number(state.price + propertylist.price);
  const wiringType = wiring.text === 'Inwall' ? 'inwall' : 'exposed';
  const createJobs = () => {
    const finalMaterialList = materiallist.map(element => {
      let obj = {};
      obj.materialId = element.id;
      obj.quantity = 1;
      return obj;
    });

    const data = {
      categoryId: jobdetails.category_id,
      jobTypeId: jobdetails.id,
      description: 'this is a demo job api, hope it works, let me know',
      propertyId: propertylist.id,
      location: location,
      completionDate: date,
      materials: finalMaterialList,
      wiringType: wiringType,
    };

    createJob(data)
      .then(response => {
        const {data} = response;
        const {message} = data;
        dispatch({
          type: AuthConstants.TOAST,
          toast: {
            title: message,
            loading: true,
            status: 'success',
          },
        });
        navigation.navigate('ComingSoon');
        console.log({response});
      })
      .catch(error => {
        const {data} = error;
        const {errorMessage} = data;
        dispatch({
          type: AuthConstants.TOAST,
          toast: {
            title: errorMessage.message,
            loading: true,
            status: 'error',
          },
        });
        console.log({error});
      });
  };

  return (
    <KeyboardAvoidingView
      style={TypographyStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <Header title="Job Summary" style={styles.header} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Box flex={0.1} alignItems="center" justifyContent="center">
          <Image source={ProfileImg} />
        </Box>
        <Box flex={0.5}>
          <Box p="m" borderBottomWidth={1} borderColor="support9">
            <Text p="s" variant="support212Medium">
              job Categroy
            </Text>
            <Text p="s" variant="tertiary212regular">
              {jobCategory.name}
            </Text>
          </Box>
          <Box p="m" borderBottomWidth={1} borderColor="support9">
            <Text p="s" variant="support212Medium">
              job Detail
            </Text>
            <Text p="s" variant="tertiary212regular">
              {jobdetails.name}
            </Text>
          </Box>
          <Box p="m" borderBottomWidth={1} borderColor="support9">
            <Text p="s" variant="support212Medium">
              Job Materials
            </Text>
            <Text p="s" variant="tertiary212regular">
              {state.name}
            </Text>
          </Box>
          <Box p="m" borderBottomWidth={1} borderColor="support9">
            <Text p="s" variant="support212Medium">
              Property Size
            </Text>
            <Text p="s" variant="tertiary212regular">
              {propertylist.area}
            </Text>
          </Box>
        </Box>
        <Box backgroundColor="secondary1">
          <Box p="m" borderBottomWidth={1} borderColor="support9">
            <Text p="s" variant="support212Medium">
              job Completion Target Date
            </Text>
            <Text p="s" variant="tertiary212regular">
              {date}
            </Text>
          </Box>
          <Box p="m" borderBottomWidth={1} borderColor="support9">
            <Text p="s" variant="support212Medium">
              Price
            </Text>
            <Text p="s" variant="tertiary212regular">
              RM {Price}
            </Text>
          </Box>
          <Box p="m" borderBottomWidth={1} borderColor="support9">
            <Text p="s" variant="support212Medium">
              Location
            </Text>
            <Text p="s" variant="primary312regular">
              {location}
            </Text>
            <Image style={styles.location} source={Location} />
          </Box>

          <Button
            buttonStyle={styles.button}
            label="Create Job"
            onPress={() => createJobs()}
          />
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 20,
    fontFamily: fonts.medium,
  },
  backIcon: {
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
  flalistConatiner: {
    marginHorizontal: 20,
  },
  location: {
    tintColor: palette.primary,
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});
