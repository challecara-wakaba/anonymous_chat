import { createStore, combineReducers } from 'redux';

import messageReducer from './modules/message';

export default createStore(
  // combineReducerはネストしたものを返すので注意
  combineReducers({
    message: messageReducer
  })
);
