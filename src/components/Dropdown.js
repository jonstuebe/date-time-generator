import React from 'react';

const Dropdown = React.createClass({
    getDefaultProps() {
        return {
            name: '',
            options: [],
        };
    },
    render() {
        return (
            <div className="select">
                <select aria-label={`select ${this.props.name}`} id={this.props.name} className="form-control" onChange={this.props.onSelect}>
                    {this.props.options.map((option, index) => {

                        if (option.selected === true) {
                            return <option defaultValue={option.value} key={index}>{option.label}</option>;
                        }

                        return <option value={option.value} key={index}>{option.label}</option>;

                    })}
                </select>
                <span></span>
            </div>
        );
    }
});

export default Dropdown;
