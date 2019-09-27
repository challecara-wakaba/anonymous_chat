import { createStore, combineReducers } from 'redux';

import threadReducer from './modules/threadModule';

export default createStore(
  // combineReducerはネストしたものを返すので注意
  combineReducers({
    thread: threadReducer
  }),
  // redux developer tools を使うための設定
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
