import React from 'react'
import ReactDOM from 'react-dom';
import Layout from './Layout';

import './general.scss';

import { createStore } from 'redux'
import { Provider, connect } from 'react-redux';
import reducer from './redux/index';

let store = createStore(reducer);
console.log(store.getState());

let GameLayout = connect(reducer)(Layout);

ReactDOM.render(
  <Provider store={store}>
    <GameLayout/>
  </Provider>,
  document.getElementById('react')
);
