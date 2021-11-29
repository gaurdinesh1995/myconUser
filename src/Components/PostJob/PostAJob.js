import React, {useReducer, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import {SharedElement} from 'react-navigation-shared-element';
import {createBox, createText} from '@shopify/restyle';
import {Button, Header, Search} from '../ReusableComponents';
import {TypographyStyles, fonts} from '../Theme/Index';
const SearchIcon = require('../../assets/Search/search.png');
import JobCategory from '../JobCategory/jobCategory';
import JobDetails from '../JobDetails/jobDetails';
import {
  getCategoryList,
  getJobDetailList,
  getJobTypeList,
  getJobTypeListId,
} from '../Services/PostJobs';
import {useSelector, useDispatch} from 'react-redux';
import {PostJobConstants} from '../../Redux';
const Box = createBox();
const Text = createText();
const Renovation = require('../../assets/Renovation/renovation.png');
const Lighting = require('../../assets/Lighting/lighting.png');
const Contractor = require('../../assets/Contractor/contractor.png');
const PlugPoint = require('../../assets/PlugPoint/plugpoint.png');
const Aircond = require('../../assets/aircond/aircond.png');

const colors = [
  {
    color: '#5b5dcb',
  },
  {
    color: '#d3dbff',
  },
  {
    color: '#e7f6ec',
  },
  {
    color: '#ede1fb',
  },
  {
    color: '#f0dec1',
  },
];

export default ({navigation, route}) => {
  const dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      JobDetails: {},
      categoryList: {},
    },
  );

  const categoryList = useSelector(state => ({
    ...state.job,
    // ...state.auth.user.user,
  }));
  console.log({categoryList});

  useEffect(() => {
    getCategories();
  }, []);

  const jobTypeID = id => {
    getJobTypeListId(id)
      .then(response => {
        let tempArr = [];
        const {data} = response;
        const {jobTypes} = data;
        if (jobTypes.length > 0) {
          tempArr = jobTypes.map((element, index) => {
            let obj = element;
            if (index === 0) {
              obj.selected = true;
              dispatch({
                type: PostJobConstants.JOB_DETAILS,
                jobdetails: obj,
              });
            } else {
              obj.selected = false;
            }
            return obj;
          });
        }
        setState({JobDetails: tempArr});
        console.log({response});
      })
      .catch(error => {
        console.log({error});
      });
  };

  const getCategories = () => {
    getCategoryList()
      .then(response => {
        const tempArr = [];
        let tempArr1 = [];
        const {data} = response;
        const {categoryList} = data;
        for (let i = 0; i < categoryList.length; i++) {
          tempArr.push(Object.assign({}, categoryList[i], {color: colors[i]}));
        }

        if (tempArr.length > 0) {
          tempArr1 = tempArr.map((element, index) => {
            let obj = element;
            if (index === 0) {
              obj.selected = true;
              jobTypeID(obj.id);
              dispatch({
                type: PostJobConstants.JOB_CATEGORY,
                jobCategory: obj,
              });
            } else {
              obj.selected = false;
            }
            return obj;
          });
        }
        setState({categoryList: tempArr1});
        console.log({response});
      })
      .catch(error => {
        console.log({error});
      });
  };

  const setJobCategory = value => {
    const id = value.id;

    const categoryList = state.categoryList.map((element, index) => {
      let obj = element;
      if (obj.id === id) {
        if (obj.selected) {
          obj.selected = false;
        } else {
          obj.selected = true;
          jobTypeID(obj.id);
          dispatch({type: PostJobConstants.JOB_CATEGORY, jobCategory: obj});
        }
      } else {
        obj.selected = false;
      }
      return obj;
    });
    console.log({categoryList});
    setState({categoryList});
  };

  const setJobList = value => {
    const id = value.id;
    const JobDetails = state.JobDetails.map((element, index) => {
      let obj = element;
      if (obj.id === id) {
        if (obj.selected) {
          obj.selected = false;
        } else {
          obj.selected = true;
          dispatch({type: PostJobConstants.JOB_DETAILS, jobdetails: obj});
        }
      } else {
        obj.selected = false;
      }
      return obj;
    });
    // const List = jobDetails.filter(e => {
    //   if (e.selected) {
    //     dispatch({type: PostJobConstants.JOB_DETAILS, jobdetails: e});
    //   }
    // });
    setState({JobDetails});
  };

  return (
    <Box flex={1}>
      <Header
        title="Post Jobs"
        style={styles.header}
        left={() => {
          return <Box height={50} width={50} />;
        }}
      />
      <KeyboardAvoidingView
        style={TypographyStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <Pressable
            onPress={() => {
              navigation.navigate('JobCategory', {showkeyboard: true});
            }}>
            <SharedElement id={`search.1.card`}>
              <Box
                pointerEvents="none"
                flexDirection="row"
                style={TypographyStyles.content}>
                <Search
                  title={'Search'}
                  value={'Search'}
                  right={() => {
                    return <Image source={SearchIcon} />;
                  }}
                />
              </Box>
            </SharedElement>
          </Pressable>
          <Box mt="l">
            <Box
              marginHorizontal={'l'}
              flexDirection="row"
              justifyContent="space-between"
              flex={1}>
              <Text variant="primary16bold">Job Category</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('JobCategory', {showkeyboard: true})
                }>
                <Text variant="primary16bold">See All</Text>
              </TouchableOpacity>
            </Box>
            <SharedElement id={`category.1.title`}>
              <FlatList
                scrollEnabled={true}
                contentContainerStyle={styles.flalistConatiner}
                data={state.categoryList}
                numColumns={2}
                renderItem={({item, index}) => {
                  return (
                    <JobCategory
                      setJobCategory={value => setJobCategory(value)}
                      index={index}
                      item={item}
                    />
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            </SharedElement>
            <Text p="l" pl="xl" variant="primary16bold">
              Job Details
            </Text>
            <FlatList
              scrollEnabled={true}
              contentContainerStyle={styles.flalistConatiner}
              data={state.JobDetails}
              numColumns={2}
              renderItem={({item, index}) => {
                return (
                  <JobDetails
                    setJobList={value => setJobList(value)}
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
              onPress={() => navigation.navigate('PostJobDetail')}
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
  flalistConatiner: {
    marginHorizontal: 20,
  },
});
