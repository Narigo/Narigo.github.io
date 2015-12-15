import { combineReducers } from 'redux';

import tick from './tickReducer';
import hero from './heroReducer';

export default combineReducers({
  tick,
  hero
});
