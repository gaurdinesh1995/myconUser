import {combineReducers} from 'redux';
import profileConstant from './ProfileConstant';

export const profileInfoReducer = (
  state = {
    profile: null,
  },
  action,
) => {
  switch (action.type) {
    case profileConstant.PROFILE:
      return {
        ...state,
        profile: action.profile,
      };

    default:
      return state;
  }
};

export const profileReducer = combineReducers({
  profile: profileInfoReducer,
});
