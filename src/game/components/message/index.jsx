import React from 'react';
import './message.scss';
import { connect } from 'react-redux';

let Message = React.createClass({
  render() {
    if (this.props.showMessage) {
      return (
        <section className="message-overlay">
          <div className="text">{this.props.message}</div>
          {this.props.buttons.map(function (button) {
            return (
              <button className="btn-ok" onclick={button.onPress}>{button.text}</button>
            )
          })}
        </section>
      );
    } else {
      return <div/>;
    }
  }

});

Message.propTypes = {
  message : React.PropTypes.string.isRequired,
  showMessage : React.PropTypes.bool.isRequired
};

export default connect(state => {
  return state.flash;
})(Message);
