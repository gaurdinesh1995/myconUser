import {combineReducers} from 'redux';
import postJobConstants from './PostJobConstants';

export const postJobReducer = (
  state = {
    jobCategory: {},
    jobdetails: {},
    materiallist: [],
    propertylist: {},
    date: '',
    location: '',
    wiring: {},
  },
  action,
) => {
  switch (action.type) {
    case postJobConstants.JOB_CATEGORY:
      return {
        ...state,
        jobCategory: action.jobCategory,
      };
    case postJobConstants.JOB_DETAILS:
      return {
        ...state,
        jobdetails: action.jobdetails,
      };
    case postJobConstants.MATERIAL_LIST:
      return {
        ...state,
        materiallist: action.materiallist,
      };
    case postJobConstants.PROPERTY_LIST:
      return {
        ...state,
        propertylist: action.propertylist,
      };
    case postJobConstants.DATE:
      return {
        ...state,
        date: action.date,
      };
    case postJobConstants.LOCATION:
      return {
        ...state,
        location: action.location,
      };
    case postJobConstants.WIRING:
      return {
        ...state,
        wiring: action.wiring,
      };
    default:
      return state;
  }
};

export const jobReducer = combineReducers({
  postjob: postJobReducer,
});
