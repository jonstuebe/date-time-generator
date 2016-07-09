import React from 'react';

const Directions = React.createClass({
    getDefaultProps(){
        return {
            type: 'js'
        }
    },
    createMarkup() {
        return {
            __html: this.props.children
        }
    },
    render(){
        return (
            <span className={`directions directions-${this.props.type}`} dangerouslySetInnerHTML={this.createMarkup()}></span>
        )
    }
});

export default Directions;
