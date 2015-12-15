import React, { Component, PropTypes } from 'react';
import { NEXT_TICK } from '../actions';

let NextTickButton = React.createClass({

  computeNextTick() {
    const dispatch = this.props.dispatch;
    dispatch(NEXT_TICK);
  },

  render() {
    console.log(this.props);
    return (
      <div className="tick">
        <div>Current tick: <span>{this.props.nr}</span></div>
        <div onClick={this.computeNextTick}>Click for next Tick</div>
      </div>
    );
  }
});

export default NextTickButton;
