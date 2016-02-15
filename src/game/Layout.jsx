import React from 'react';
import { connect } from 'react-redux';
import NextTickButton from './components/tick/NextTickButton';
import Message from './components/message';
import Heroes from './components/heroes';
import Login from './components/account/Login';

let Layout = React.createClass({
  render () {
    console.log('layout props', this.props);
    if (this.props.isLoggedIn) {
      return (
        <div className="game">
          <Message/>
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

export default connect(state => state.get('account').get('data').toJS())(Layout);
