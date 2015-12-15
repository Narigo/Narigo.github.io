import React from 'react'
import ReactDOM from 'react-dom';
import Layout from './Layout';

import './general.scss';

import { createStore } from 'redux'
import { Provider, connect } from 'react-redux';
import nextState from './redux/index';

let store = createStore(nextState);
console.log(store.getState());

let Game = connect(nextState)(Layout);

ReactDOM.render(
  <Provider store={store}>
    <Game/>
  </Provider>,
  document.getElementById('react')
);
