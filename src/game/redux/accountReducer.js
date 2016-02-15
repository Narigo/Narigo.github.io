import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';
import heroReducer from './heroReducer';

const initialAccountState = Immutable.Map({
  id : 0,
  isLoggingIn : false,
  isLoggedIn : false
});

function accountReducer(accountState = initialAccountState, action) {
  console.log('reducer account called with ', accountState.toJS(), action);

  switch (action.type) {
    case 'TRY_LOGIN':
      return accountState.merge({
        id : 0,
        isLoggingIn : true,
        isLoggedIn : false
      });

    case 'LOGIN':
      return accountState.merge({
        id : action.account.id,
        name : action.account.name,
        isLoggingIn : false,
        isLoggedIn : true
      });

    case 'LOGOUT':
      return accountState.merge({
        isLoggedIn : false,
        isLoggingIn : false
      });

    default:
      return accountState;
  }
}

export default combineReducers({
  data : accountReducer,
  heroes : heroReducer
});
