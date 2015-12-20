import React, { Component, PropTypes } from 'react';
import { COMPUTE_NEXT_TICK, NEXT_TICK } from './actions';

let NextTickButton = React.createClass({

  computeNextTick() {
    const dispatch = this.props.dispatch;
    this.refs.button.disabled = true;
    dispatch(COMPUTE_NEXT_TICK);
    setTimeout(() => {
      dispatch(NEXT_TICK);
      this.refs.button.disabled = false;
    }, 2000);
  },

  render() {
    console.log(this.props);
    return (
      <div className="tick">
        <div>Current tick: <span>{this.props.nr}</span></div>
        <button ref="button" onClick={this.computeNextTick}>Click for next Tick</button>
      </div>
    );
  }
});

export default NextTickButton;
