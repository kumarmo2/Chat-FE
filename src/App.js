import React, { PureComponent } from 'react';
import './App.css';
import { registerEvents } from './apis/';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
    }
  }

  handleWsError = err => {
    console.log("ws error: ", err);
  }

  handleWsBtnClick = () => {
    this.ws = new WebSocket("ws://127.0.0.1:9001");
    this.ws.onerror = this.handleWsError;
    this.ws.onmessage = this.handleMessageRecieve;
  }

  handleMessageRecieve = (event) => {
    console.log("message recieved: ", event);
  }

  handleInputChage = event => {
    // console.log(event.currentTarget.value);
    let value = event.currentTarget.value;
    this.setState({
      inputValue: value
    });
  }

  handleSendMessage = () => {
    // if (this.state.inputValue) {
    //   this.ws.send(this.state.inputValue);
    // }
    const queueWrapper = {
      queueName: "hello"
    };
    this.ws.send(JSON.stringify(queueWrapper));
  }

  onWebSocketConnectionOpen = () => {
    const queueWrapper = {
      queueName: this.queueName,
    };
    this.ws.send(JSON.stringify(queueWrapper));
  }

  render() {
    return (
      <div className="App">
        <h1>This is websocket client practice</h1>
        <button onClick={this.handleWsBtnClick}>Ws Start</button>
        <input value={this.state.inputValue} onChange={this.handleInputChage} />
        <button onClick={this.handleSendMessage}>Send</button>
      </div >
    );
  }

  handleRegisterEventApiResponse = response => {
    if (response && response.queueName) {
      this.queueName = response.queueName;
      this.ws = new WebSocket("ws://127.0.0.1:9001");
      this.ws.onerror = this.handleWsError;
      this.ws.onmessage = this.handleMessageRecieve;
      this.ws.onopen = this.onWebSocketConnectionOpen;
    }
    console.log("register event api response: ", response);
  }

  componentDidMount() {
    registerEvents(1)
      .then(this.handleRegisterEventApiResponse)
  }
}

export default App;
