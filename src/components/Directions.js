import React, { Component } from "react";

class Directions extends Component {
  static defaultProps = {
    type: "js"
  };

  createMarkup = () => {
    return {
      __html: this.props.children
    };
  };

  render() {
    return (
      <span
        className={`directions directions-${this.props.type}`}
        dangerouslySetInnerHTML={this.createMarkup()}
      />
    );
  }
}

export default Directions;
