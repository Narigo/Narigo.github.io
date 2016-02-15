import React from 'react'
import ReactDOM from 'react-dom';
import Layout from './Layout';

import './general.scss';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './redux';
import Immutable from 'immutable';

let state = reducer(undefined, {type:'INIT'});//Immutable.fromJS({account: {data:undefined, heroes:undefined}, flash:undefined, tick:undefined}), 'INIT');
console.log('hello reducer->state=', state, ' -- reducer=', reducer);
let store = applyMiddleware(thunkMiddleware, createLogger())(createStore)(reducer);
console.log('initial state after createStore:', store.getState());

ReactDOM.render(
  <Provider store={store}>
    <Layout/>
  </Provider>,
  document.getElementById('react')
);
