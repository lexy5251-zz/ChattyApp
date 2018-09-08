import React, { Component } from "react";
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messageItems = this.props.messages.map((message,id) => {
      return <Message key={id} message={message} />
    });
    return (
      <main className="messages">
      <div>{messageItems}</div>
      <div className="notification">
      <span className="notification-content"></span>
      </div>
      </main>
    )
  }
}


export default MessageList;