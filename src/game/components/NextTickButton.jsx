import React, { Component, PropTypes } from 'react';
import { COMPUTE_NEXT_TICK, NEXT_TICK } from '../actions';

let NextTickButton = React.createClass({

  computeNextTick() {
    const dispatch = this.props.dispatch;
    dispatch(COMPUTE_NEXT_TICK);
    setTimeout(function() {
      dispatch(NEXT_TICK);
    }, 2000);
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
