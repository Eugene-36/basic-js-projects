import { combineReducers } from 'redux';
import accountReducer from './accountReducer.js';

const reducers = combineReducers({
  account: accountReducer,
});

export default reducers;
