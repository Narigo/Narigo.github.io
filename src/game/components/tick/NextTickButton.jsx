import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { computeNextTick, stopTicking } from './actions';
import './tick.scss';

let NextTickButton = React.createClass({

  computeNextTick() {
    console.log('dispatching computation of next tick');
    this.props.dispatch(computeNextTick());
    console.log('tick props after dispatch:', this.props);
  },

  stopTicking() {
    this.props.dispatch(stopTicking());
  },

  render() {
    console.log('tick props: ', this.props);
    return (
      <div className="tick">
        <div>Current tick: <span>{this.props.nr}</span></div>
        <button disabled={this.props.isComputing} onClick={this.computeNextTick}>(Re-)Start ticks</button>
        <button disabled={this.props.isComputing} onClick={this.stopTicking}>Stop ticks</button>
      </div>
    );
  }
});

NextTickButton.propTypes = {
  dispatch : React.PropTypes.func.isRequired
};

export default connect(state => {
  console.log('got a state in tick to connect', state);
  return state.get('tick').toJS();
})(NextTickButton);
