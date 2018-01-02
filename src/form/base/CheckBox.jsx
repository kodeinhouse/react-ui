import React, { Component } from 'react';

export class CheckBox extends Component
{
    constructor(props)
    {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event)
    {
        let target = event.target;

        if(this.props.onChange)
            this.props.onChange(this.props, target.checked);
    }

    render()
    {
        return <input type="checkbox"
                    value={this.props.value}
                    name={this.props.name}
                    checked={this.props.checked}
                    label={this.props.label}
                    required={this.props.required}
                    disabled={this.props.disabled}
                    readOnly={this.props.readOnly}
                    placeholder={this.props.placeholder}
                    onKeyPress={this.props.onKeyPress}
                    onChange={this.onChange}
                    onBlur={this.props.onBlur} />;
    }
}
