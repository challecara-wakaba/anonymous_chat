import { createStore, combineReducers } from 'redux';

import messageReducer from './modules/message';

export default createStore(
  // combineReducerはネストしたものを返すので注意
  combineReducers({
    message: messageReducer
  }),
  // redux developer tools を使うための設定
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
