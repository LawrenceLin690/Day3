import React, { Component } from 'react';
import axios from 'axios';

class Main extends Component {
  constructor() {
    super();
    this.state = { textarr: [] };
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/reddit');
      this.setState({ textarr: res.data });
    } catch (error) {
      console.log(error);
    }
  }

  // shouldComponentUpdate()

  render() {
    return (
      <div>
        {this.state.textarr.map((post, idx) => (
          <h5 key={idx}>{post}</h5>
        ))}
      </div>
    );
  }
}

export default Main;
