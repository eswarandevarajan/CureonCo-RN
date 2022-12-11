import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import MenuReducer from './MenuReducer';
import LoaderReducer from './LoaderReducer';
import ErrorReducer from './ErrorReducer';
import { USER_LOGGED_OUT } from '../../Constants/ActionConstants';

const appReducer = combineReducers({
  AuthReducer,
  ProfileReducer,
  MenuReducer,
  LoaderReducer,
  ErrorReducer
});

const rootReducer = (state, action) => {
  // if (action.type === USER_LOGGED_OUT) {
  //   state = undefined;
  // }
  return appReducer(state, action);
};

export default rootReducer;
