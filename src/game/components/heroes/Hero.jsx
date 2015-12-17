import React, { Component, PropTypes } from 'react';
import { drainLife, removeHero } from './actions';

let NextTickButton = React.createClass({

  componentWillMount() {
    console.log('added a hero', this.props.id);
  },

  componentWillUnmount() {
    console.log('remove a hero', this.props.id);
  },

  render() {
    return (
      <div className="hero">
        <div>Attack: <span>{this.props.attack}</span></div>
        <div>Hitpoints: <span>{this.props.hitpoints}</span></div>
        <button onClick={this.props.dealDamage}>Click to deal damage to hero</button>
        <button onClick={this.props.remove}>Click to remove hero</button>
      </div>
    );
  }
});

export default NextTickButton;
