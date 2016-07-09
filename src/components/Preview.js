import React from 'react';

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
                                <input type="submit" id="copy" value="Copy" onClick={this.props.onCopy} />
                                <code>{this.props.format}</code>
                            </div>
                            <div className="live-preview col-sm-6">
                                <h4>Live Preview</h4>
                                <input type="text" disabled className="input-text disabled" value="" />
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
