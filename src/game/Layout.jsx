import React from 'react';
import NextTickButton from './components/tick/NextTickButton';
import Heroes from './components/heroes';
import { login } from './components/account/actions';

export default React.createClass({
  login() {
    console.log('login pressed');
    login()(this.props.dispatch);
  },

  render () {
    if (this.props.isLoggedIn) {
      return (
        <div className="game">
          <Heroes/>
          <NextTickButton/>
        </div>
      );
    } else {
      return (
        <div className="login">
          <button onClick={this.login}>Login</button>
        </div>
      );
    }
  }
});
