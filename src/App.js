import React, { Component } from "react";
import moment from "moment";
import { each } from "lodash";
import { mouseTrap } from "react-mousetrap";

import "./sass/style.scss";

import ItemContainer from "./containers/ItemContainer";

import Header from "./components/Header";

import Dropdown from "./components/Dropdown";
import Directions from "./components/Directions";

import Row from "./components/Row";
import Col from "./components/Col";

import Preview from "./components/Preview";

const languages = {
  js: {
    name: "Javascript",
    directions:
      'To simplify date methods in javascript the <a href="http://momentjs.com" target="_blank">moment.js</a> library is required.',
    previewFormat: "moment().format('$')"
  },
  php: {
    name: "PHP",
    directions:
      'php documentation on the <a href="http://php.net/manual/en/function.date.php" target="_blank">date method</a>',
    previewFormat: "date('$')"
  },
  ruby: {
    name: "Ruby",
    directions:
      'ruby documentation on the <a href="http://ruby-doc.org/core-2.2.0/Time.html#method-i-strftime" target="_blank">strftime method</a>',
    previewFormat: 'Time.new().strftime "$"'
  },
  python: {
    name: "Python",
    directions:
      'python documentation on the <a href="https://docs.python.org/2/library/datetime.html#strftime-and-strptime-behavior" target="_blank">strftime method</a>',
    previewFormat: "time.strftime('$')"
  }
};

let langaugesDropdown = [];

for (let key in languages) {
  let value = key;
  let label = languages[key].name;
  langaugesDropdown.push({ value, label });
}

class App extends Component {
  state = {
    language: "js",
    preview: [],
    livePreview: ""
  };

  componentWillMount() {
    const previousState = JSON.parse(localStorage.getItem("app"));
    if (previousState) {
      this.setState(previousState);
    }

    this.props.bindShortcut("backspace", this.onBackspace);
    this.props.bindShortcut(
      [":", ",", "/", "-", ".", "(", ")", "space"],
      this.onShortcuts
    );

    setInterval(() => {
      if (this.state.preview.length === 0) {
        this.setState({ livePreview: "" });
      } else {
        this.setState({ livePreview: moment().format(this.renderCode("js")) });
      }
    }, 1000);
  }

  componentDidUpdate() {
    localStorage.setItem("app", JSON.stringify(this.state));
  }

  componentWillUnmount() {
    this.props.unbindShortcut("backspace", this.onBackspace);
    this.props.unbindShortcut(
      [":", ",", "/", "-", ".", "(", ")", "space"],
      this.onShortcuts
    );
  }

  onBackspace = e => {
    let preview = this.state.preview;
    preview.pop();
    this.setState({ preview });
    e.preventDefault();
  };

  onLanguageSelect = e => {
    this.setState({ language: e.target.value });
  };

  onShortcuts = e => {
    let preview = this.state.preview;

    if (e.code === "Space") {
      preview.push({ key: true, value: " " });
    } else if (e.code === "Comma") {
      preview.push({ key: true, value: "," });
    } else if (e.code === "Semicolon") {
      preview.push({ key: true, value: ":" });
    } else if (e.code === "Period") {
      preview.push({ key: true, value: "." });
    } else if (e.code === "Slash") {
      preview.push({ key: true, value: "/" });
    } else if (e.code === "Minus") {
      preview.push({ key: true, value: "-" });
    } else if (e.code === "Digit9") {
      preview.push({ key: true, value: "(" });
    } else if (e.code === "Digit0") {
      preview.push({ key: true, value: ")" });
    }

    this.setState({ preview });
    e.preventDefault();
  };

  selectItem = formats => {
    let preview = this.state.preview;
    preview.push(formats);
    this.setState({ preview });
  };

  onReset = e => {
    this.setState({ preview: [] });
    e.preventDefault();
  };

  renderCode = (type = null) => {
    let preview = [];
    let language = this.state.language;

    if (type != null) {
      language = type;
    }

    each(this.state.preview, formats => {
      if (formats.key) {
        preview.push(formats.value);
      } else {
        preview.push(formats[language]);
      }
    });

    if (this.state.preview.length === 0) {
      return "";
    }

    preview = preview.join("");
    return preview;
  };

  render() {
    return (
      <div className="container-fluid">
        <Row>
          <Header />
        </Row>
        <Row>
          <Col xs={12}>
            <div className="hr" />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="form-group col-xs-12">
              <label htmlFor="language">Language</label>
              <Dropdown
                name="language"
                options={langaugesDropdown}
                onSelect={this.onLanguageSelect}
              />
              <Directions type={this.state.language}>
                {languages[this.state.language].directions}
              </Directions>
            </div>
          </Col>
        </Row>

        <ItemContainer
          language={this.state.language}
          selectItem={this.selectItem}
        />

        <Preview
          format={languages[this.state.language].previewFormat}
          language={languages[this.state.language].name}
          code={this.renderCode()}
          live={this.state.livePreview}
          onReset={this.onReset}
        />
      </div>
    );
  }
}

export default mouseTrap(App);
