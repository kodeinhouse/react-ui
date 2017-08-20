import React, { Component } from 'react';

export class Dropdown extends Component
{
    constructor(props)
    {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event)
    {
        // TODO: Need to replace the first parameter by this.props to match the other fields
        if(this.props.onChange)
            this.props.onChange(this, event.target.value);
    }

    isValid()
    {
        return this.props.value != null;
    }

    render()
    {
        let options = this.props.options || [];

        return (
            <select name={this.props.name} value={this.props.value} onChange={this.onChange}>
                {options.map(function(option, index){
                    return <option key={"dd-" + index} value={option.value}>{option.text}</option>;
                })}
            </select>
        );
    }
}
