import React from 'react';

const Heading = React.createClass({
    render() {
        return <h4>{this.props.children}</h4>;
    }
});

export default Heading;
