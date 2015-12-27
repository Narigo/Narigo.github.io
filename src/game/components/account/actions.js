const LOGIN = {
  type : 'LOGIN',
  account : {
    id : 'test',
    name : 'Tester'
  }
};

const TRY_LOGIN = {
  type : 'TRY_LOGIN',
  accountId : 'test'
};

const LOGOUT = {
  type : 'LOGOUT',
  accountId : 'test'
};

export function login() {
  console.log()
  return (dispatch) => {
    dispatch(TRY_LOGIN);
    setTimeout(() => {
      dispatch(LOGIN);
    }, 200);
  };
}

export function logout() {
  return (dispatch) => {
    dispatch(LOGOUT);
  };
}
