import React, { Component } from "react";

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state={
      username: '',
      newMessage:""
    }
  };

handleChangeUsername = (e) => {

  this.setState({
    username: e.target.value
  })
};


  render() {
    return (
      <footer className="chatbar">
      <input
      onKeyPress={this.props.handleKeyPress}
      onChange={this.handleChangeUsername}
      className="chatbar-username"
      type="text"
      />
      <input
      onKeyPress={this.props.handleKeyPress}
      className="chatbar-message"
      type="text"
      placeholder="Type a message and hit ENTER"
      />
      </footer>
    );
  }
};



export default ChatBar;
