import React from 'react';
import './message.scss';

let Message = React.createClass({
  render() {
    if (this.props.showMessage) {
      return (
        <section className="message-overlay">
          <div className="text">{this.props.message}</div>
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

export default Message;
