import React from 'react';
import { connect } from 'react-redux';
import NextTickButton from './components/tick/NextTickButton';
import Heroes from './components/heroes';
import Login from './components/account/Login';

let Layout = React.createClass({
  render () {
    console.log('layout props', this.props);
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
          <Login/>
        </div>
      );
    }
  }
});

export default connect(state => state.account.data)(Layout);
