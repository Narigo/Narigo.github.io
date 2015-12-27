import { combineReducers } from 'redux';

import account from './accountReducer';
import heroes from './heroReducer';
import tick from './tickReducer';

export default combineReducers({
  account,
  tick,
  heroes
});
