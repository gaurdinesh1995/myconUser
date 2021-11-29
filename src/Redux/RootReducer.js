import {combineReducers} from 'redux';
import {authReducers, AuthConstants, postJobReducer} from '../Redux/index';

const combinedReducer = combineReducers({
  auth: authReducers,
  job: postJobReducer,
});

const rootReducer = (state, action) => {
  let newState = {...state};
  if (action.type === AuthConstants.RESET_STATE) {
    newState = undefined;
  }
  return combinedReducer(newState, action);
};

export default rootReducer;
