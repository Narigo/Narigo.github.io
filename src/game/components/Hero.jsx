import React, { Component, PropTypes } from 'react';
import { drainLife } from '../actions';

let NextTickButton = React.createClass({

  dealDamage() {
    const dispatch = this.props.dispatch;
    dispatch(drainLife(10));
  },

  render() {
    console.log('hero props:', this.props);
    return (
      <div className="hero">
        <div>Attack: <span>{this.props.attack}</span></div>
        <div>Hitpoints: <span>{this.props.hitpoints}</span></div>
        <div onClick={this.dealDamage}>Click to deal damage to hero</div>
      </div>
    );
  }
});

export default NextTickButton;
