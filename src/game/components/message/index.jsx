import React from 'react';
import './message.scss';
import { dismissMessage } from './actions';
import { connect } from 'react-redux';

let Message = React.createClass({

  clickHandler(action) {
    return () => {
      this.props.dispatch(action());
    }
  },

  closeMessage() {
    console.log('hello in dismiss??');
    this.props.dispatch(dismissMessage);
  },

  render() {
    if (this.props.showMessage) {
      let closeBtn = (this.props.closeable) ? <button className="close" onClick={this.closeMessage}>Close</button> : '';

      return (
        <section className="message-overlay">
          {closeBtn}
          <div className="text">{this.props.message}</div>
          {this.props.buttons.map((button, id) => {
            return (
              <button key={id} className="btn-ok" onClick={this.clickHandler(button.action)}>{button.text}</button>
            );
          })}
        </section>
      );
    } else {
      return <div/>;
    }
  }

});

Message.propTypes = {
  closeable : React.PropTypes.bool.isRequired,
  message : React.PropTypes.string.isRequired,
  showMessage : React.PropTypes.bool.isRequired,
  buttons : React.PropTypes.array.isRequired
};

export default connect(state => {
  return state.get('flash').toJS();
})(Message);
