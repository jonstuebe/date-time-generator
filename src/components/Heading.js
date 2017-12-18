import React, { Component } from "react";

class Heading extends Component {
  render() {
    return <h4>{this.props.children}</h4>;
  }
}

export default Heading;
