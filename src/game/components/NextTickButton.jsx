import React, { Component, PropTypes } from 'react';
import { NEXT_TICK } from '../actions';

export default class NextTickButton extends Component {

  computeNextTick() {
    const dispatch = this.props.dispatch;
    dispatch(NEXT_TICK);
  }

  render() {
    console.log(this.props);
    return (
      <div className="tick">
        <div onClick={this.computeNextTick}>Click for next Tick</div>
      </div>
    );
  }
}