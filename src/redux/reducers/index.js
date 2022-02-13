import {combineReducers} from 'redux';
import LeadsReducer from './LeadsReducer'
import LoggedInUser from './LoggedInUser'

const allReducers = combineReducers(
  {
    LeadsReducer,
    LoggedInUser,
  },
  {},
);

export default allReducers;
