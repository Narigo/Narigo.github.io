import { combineReducers } from 'redux';
import heroReducer from './heroReducer';

const initialAccountState = {
  id : 0,
  isLoggingIn : false,
  isLoggedIn : false,
  showMessage : false,
  message : ''
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
        ...accountState,
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

    case 'SHOW_MESSAGE':
      return {
        ...accountState,
        showMessage : true,
        message: action.message
      };

    case 'DISMISS_MESSAGE':
      return {
        ...accountState,
        showMessage : false
      };

    default:
      return accountState;
  }
}

export default combineReducers({
  data : accountReducer,
  heroes : heroReducer
});
