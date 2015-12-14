import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import NextTickButton from './components/NextTickButton';
import nextState from './redux/tickReducer';

let store = createStore(nextState);

export default React.createClass({
  render () {
    return (
      <div className="game">
        <Provider store={store}>
          <NextTickButton />
        </Provider>
      </div>
    );
  }
});
