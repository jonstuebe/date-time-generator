import React, { Component } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import Row from "./Row";

class Preview extends Component {
  render() {
    const { language, code, format, live, onReset } = this.props;
    return (
      <div>
        <div className="preview-push" />
        <div className="fixed">
          <div className="container-fluid">
            <Row>
              <div className="code-preview col-sm-6">
                <h4>{`Code (${language})`}</h4>
                <CopyToClipboard text={code}>
                  <input type="submit" id="copy" value="Copy" />
                </CopyToClipboard>
                <code>{format.replace("$", code)}</code>
              </div>
              <div className="live-preview col-sm-6">
                <h4>Live Preview</h4>
                <input
                  type="text"
                  disabled
                  className="input-text disabled"
                  value={live}
                />
                <input
                  type="submit"
                  value="Reset"
                  className="reset"
                  onClick={onReset}
                />
              </div>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default Preview;
