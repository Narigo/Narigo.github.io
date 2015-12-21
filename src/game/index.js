import React from 'react'
import ReactDOM from 'react-dom';
import Layout from './Layout';

import './general.scss';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import reducer from './redux/index';

//const createStoreWithMiddleware = applyMiddleware([
//  thunkMiddleware,
//  loggerMiddleware
//])(createStore);

//let store = createStoreWithMiddleware(reducer);
let store = createStore(reducer);
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <Layout/>
  </Provider>,
  document.getElementById('react')
);
