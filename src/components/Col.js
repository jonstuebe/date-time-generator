import React from 'react';

const Col = React.createClass({

    render(){

        let theClasses = [];
        let prefix = 'col-';

        if(this.props.xs) theClasses.push(`${prefix}xs-${this.props.xs}`);
        if(this.props.sm) theClasses.push(`${prefix}sm-${this.props.sm}`);
        if(this.props.md) theClasses.push(`${prefix}md-${this.props.md}`);
        if(this.props.lg) theClasses.push(`${prefix}lg-${this.props.lg}`);

        return (
            <div className={theClasses.join(' ')}>
                {this.props.children}
            </div>
        );
    }

})

export default Col;
