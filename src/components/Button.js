import React from 'react';

const Button = React.createClass({
    render() {

        let classNames = [ 'btn' ];
        if(this.props.preset) classNames.push('preset');

        return (
            <a className={classNames.join(' ')} onClick={this.props.onClick}>{this.props.children}</a>
        );
    }
});

export default Button;
