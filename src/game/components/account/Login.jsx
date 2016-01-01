import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from './actions';

let Login = React.createClass({

  login() {
    console.log('login pressed');
    login(this.props.dispatch);
  },

  render() {
    return (
      <div className="login">
        <button onClick={this.login}>Login</button>
      </div>
    );
  }

});

Login.propTypes = {
  dispatch : React.PropTypes.func.isRequired
};

export default connect(state => state.account)(Login);
