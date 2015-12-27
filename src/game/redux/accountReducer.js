const initialTickState = {
  account : null,
  isLoggingIn : false,
  isLoggedIn : false
};

export default function nextState(accountState = initialTickState, action) {
  console.log('reducer account called with ', accountState, action);

  switch (action.type) {
    case 'TRY_LOGIN':
      return {
        account : null,
        isLoggingIn : true,
        isLoggedIn : false
      };

    case 'LOGIN':
      return {
        account : action.account,
        isLoggingIn : false,
        isLoggedIn : true
      };

    case 'LOGOUT':
      return {
        account : null,
        isLoggedIn : false,
        isLoggingIn : false
      };

    default:
      return accountState;
  }
}
