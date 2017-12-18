import React, { Component } from "react";
import moment from "moment";

import Button from "./Button";
import Col from "./Col";

class Item extends Component {
  static defaultProps = {
    preset: false,
    formats: {},
    live: false,
    colWrapper: false
  };

  state = {
    label: ""
  };

  componentDidMount() {
    if (this.props.formats[this.props.language]) {
      this.setState({
        label: moment().format(this.props.formats.js)
      });

      if (this.props.live) {
        setInterval(() => {
          this.setState({
            label: moment().format(this.props.formats.js)
          });
        }, 1000);
      }
    }
  }

  onClick = e => {
    this.props.onClick(this.props.formats);
    e.preventDefault();
  };

  render() {
    if (!this.props.formats[this.props.language]) return null;

    let presetStyle = this.props.preset
      ? { display: "inline-block", marginRight: "1em", marginBottom: "1em" }
      : {};

    let component = (
      <span style={presetStyle}>
        <Button onClick={this.onClick}>{this.state.label}</Button>
        <p className="help-text">{this.props.desc}</p>
      </span>
    );

    if (this.props.colWrapper) {
      return (
        <Col xs={4} sm={2}>
          {component}
        </Col>
      );
    }

    return component;
  }
}

export default Item;
