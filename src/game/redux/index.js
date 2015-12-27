import { combineReducers } from 'redux';

import account from './accountReducer';
import tick from './tickReducer';

export default combineReducers({
  account,
  tick
});
