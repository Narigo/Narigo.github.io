import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';

import account from './accountReducer';
import flash from './flashMessageReducer';
import tick from './tickReducer';

export default combineReducers({
  account,
  flash,
  tick
});
