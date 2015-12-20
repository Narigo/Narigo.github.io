import React from 'react';
import NextTickButtonComponent from './components/tick/NextTickButton';
import HeroesModule from './components/heroes/index';
import { connect } from 'react-redux';

const Heroes = connect((state) => state.heroes)(HeroesModule);
const NextTickButton = connect((state) => state.tick)(NextTickButtonComponent);

export default React.createClass({
  render () {
    return (
      <div className="game">
        <Heroes dispatch={this.props.dispatch} heroes={this.props.heroes}/>
        <NextTickButton tick={this.props.tick}/>
      </div>
    );
  }
});
