import { combineReducers } from 'redux';

import tick from './tickReducer';
import heroes from './heroReducer';

export default combineReducers({
  tick,
  heroes
});
