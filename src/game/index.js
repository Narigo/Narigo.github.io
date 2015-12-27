import React from 'react'
import ReactDOM from 'react-dom';
import Layout from './Layout';

import './general.scss';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './redux';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, createLogger())(createStore);

let store = createStoreWithMiddleware(reducer);
console.log('initial state:', store.getState());

ReactDOM.render(
  <Provider store={store}>
    <Layout/>
  </Provider>,
  document.getElementById('react')
);
