import React, { Component } from "react";

class Global extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {}

  render() {
    return <div>test</div>;
  }
}

export default Global;
