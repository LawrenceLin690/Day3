import React, { Component } from 'react';

class Main extends Component {
  constructor() {
    super();
    this.state = { text: 'Hello World' };
  }

  render() {
    return (
      <div>
        <h1>{this.state.text}</h1>
      </div>
    );
  }
}

export default Main;
