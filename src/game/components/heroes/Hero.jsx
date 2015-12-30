import React, { Component, PropTypes } from 'react';
import { drainLife, removeHero } from './actions';
import './hero.scss';

let Hero = React.createClass({

  renderStats() {
    return (
      <div className="stats">
        <div className="stat strength"><span className="key">Strength</span><span className="value">{this.props.strength}</span></div>
        <div className="stat dexterity"><span className="key">Dexterity</span><span className="value">{this.props.dexterity}</span></div>
        <div className="stat intelligence"><span className="key">Intelligence</span><span className="value">{this.props.intelligence}</span></div>
        <div className="stat vitality"><span className="key">Vitality</span><span className="value">{this.props.vitality}</span></div>
        <div className="stat hitpoints"><span className="key">Hitpoints</span><span className="value">{this.props.hitpoints}</span></div>
      </div>
    );
  },

  render() {
    return (
      <div className="hero">
        {this.renderStats()}
        <div className="buttons">
          <button onClick={this.props.dealDamage}>Click to deal damage to hero</button>
          <button onClick={this.props.remove}>Click to remove hero</button>
        </div>
      </div>
    );
  }
});

export default Hero;
