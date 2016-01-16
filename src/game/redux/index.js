import { combineReducers } from 'redux';

import account from './accountReducer';
import flash from './flashMessageReducer';
import tick from './tickReducer';

export default combineReducers({
  account,
  flash,
  tick
});
