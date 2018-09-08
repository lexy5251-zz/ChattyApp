import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Anonymous',
      messages: [],
      usernames: [],
      account:0

    };
  }

  handleKeyPress = (e) => {

    if (e.key === "Enter" && e.target.className === "chatbar-message") {

      const messageObj = {
        type: "incomingMessage",
        username:this.state.currentUser,
        content: e.target.value
      };

      let myJSON = JSON.stringify(messageObj);

      let sendMessage = this.socket.send(myJSON);

      console.log("what is sendMessage:", sendMessage);

    } else if (e.key === "Enter" && e.target.className==="chatbar-username") {

      const messageObj = {
        type:"incomingNotification",
        oldusername: this.state.currentUser,
        newusername: e.target.value,
        content: "a"
      }

      this.setState({
        oldUsername: messageObj.username,
        currentUser: e.target.value,
      });

      let oldUsername = messageObj.oldusername;
      let newUsername = messageObj.newusername;
      let myJSON = JSON.stringify(messageObj);
      let sendUsername = this.socket.send(myJSON);
    }

  };


  componentDidMount() {

    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = (e) => {
      console.log("Connected to server");

    };

    this.socket.onmessage = (e) => {

      let data =JSON.parse(e.data);
      let oldUsername = data.oldusername;
      let newUsername = data.newusername;

      switch(data.type) {

      case "incomingMessage":

      let oldMessages = this.state.messages;
      const updateMessageObj = {
        type: "incomingMessage",
        username:data.username,
        content: data.content,
      };

      const newMessages = [...oldMessages, updateMessageObj];

      const getNewMessage = this.setState({
        messages: newMessages,
      });

      break;
      // handle incoming notification
      case "incomingNotification":

      $(".notification-content").append("<p>" + oldUsername + " changed their name to " + newUsername+"</p>");
      break;

      case "initialization":

      break;

      default:
      // show an error in the console if the message type is unknown
      throw new Error("Unknown event type " + data.type);
      }

      const accountNumber = this.setState({
        account: data.number
      });

    }

  };

  render(){
    return (
      <div>
        <Notification account={this.state.account}/>
        <MessageList messages={this.state.messages}
                     currentUser={this.state.currentUser}
                     />
        <ChatBar currentUser={this.state.currentUser}
                 handleKeyPress={this.handleKeyPress}/>
      </div>
    );

  };
}

export class Notification extends Component {
  render() {
    return(
      <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <h2 style={{float:'right'}}>{this.props.account} users online</h2>
      </nav>
      )
  }
};

export default App;
