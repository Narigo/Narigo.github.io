import React from 'react';
import NextTickButton from './components/tick/NextTickButton';
import Heroes from './components/heroes/index';

export default React.createClass({
  render () {
    return (
      <div className="game">
        <Heroes/>
        <NextTickButton/>
      </div>
    );
  }
});
