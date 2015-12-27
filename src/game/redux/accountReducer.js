import { combineReducers } from 'redux';
import heroReducer from './heroReducer';

const initialAccountState = {
  id : 0,
  isLoggingIn : false,
  isLoggedIn : false
};

function accountReducer(accountState = initialAccountState, action) {
  console.log('reducer account called with ', accountState, action);

  switch (action.type) {
    case 'TRY_LOGIN':
      return {
        ...accountState,
        id : 0,
        isLoggingIn : true,
        isLoggedIn : false
      };

    case 'LOGIN':
      return {
        id : action.account.id,
        name : action.account.name,
        isLoggingIn : false,
        isLoggedIn : true
      };

    case 'LOGOUT':
      return {
        ...accountState,
        isLoggedIn : false,
        isLoggingIn : false
      };

    default:
      return accountState;
  }
}

export default combineReducers({
  data : accountReducer,
  heroes : heroReducer
});
