import React from 'react';

const Header = () => {
    return (
        <header>
            <div className="row">
                <div className="col-xs-12">
                    <h1>Date/Time Generator</h1>
                    <h4>by <a href="http://twitter.com/jonstuebe" target="_blank">Jon Stuebe</a></h4>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-8">
                    <p>A Simple Date/Time string format generator built in HTML/React.</p>
                    <p>Click on any buttons below to generate the code string and see a live preview. To add any symbols just type them in your browser. To undo hit the backspace key.</p>
                    <span style={{ marginRight: 10 }}>
                        <a className="twitter-share-button" href="https://twitter.com/share">Tweet</a>
                    </span>

                    <iframe src="https://ghbtns.com/github-btn.html?user=jonstuebe&amp;repo=date-time-generator&amp;type=star&amp;count=true&amp;v=2" frameBorder="0" scrolling="0" width="170px" height="20px"></iframe>
                </div>
            </div>
        </header>
    )
}

export default Header;
