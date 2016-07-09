import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import Row from './Row';

const Preview = React.createClass({
    render() {
        return (
            <div>
                <div className="preview-push"></div>
                <div className="fixed">
                    <div className="container-fluid">
                        <Row>
                            <div className="code-preview col-sm-6">
                                <h4>{`Code (${this.props.language})`}</h4>
                                <CopyToClipboard text={this.props.code}>
                                    <input type="submit" id="copy" value="Copy" />
                                </CopyToClipboard>
                                <code>{this.props.format.replace('$',this.props.code)}</code>
                            </div>
                            <div className="live-preview col-sm-6">
                                <h4>Live Preview</h4>
                                <input type="text" disabled className="input-text disabled" value={this.props.live} />
                                <input type="submit" value="Reset" className="reset" onClick={this.props.onReset} />
                            </div>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
});

export default Preview;
