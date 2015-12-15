import React from 'react';
import reducer from './redux/index';
import NextTickButtonComponent from './components/NextTickButton';
import HeroComponent from './components/Hero';
import { connect } from 'react-redux';

const Hero = connect((state) => state.hero)(HeroComponent);
const NextTickButton = connect((state) => state.tick)(NextTickButtonComponent);

export default React.createClass({
  render () {
    return (
      <div className="game">
        <Hero />
        <NextTickButton />
      </div>
    );
  }
});
