import { combineReducers } from 'redux'
import LeadsReducer from './LeadsReducer'
import LoggedInUser from './LoggedInUser'
import LeadsFilterReducer from './LeadsFilterReducer'

const allReducers = combineReducers(
  {
    LeadsReducer,
    LoggedInUser,
    LeadsFilterReducer
  },
  {},
)

export default allReducers
