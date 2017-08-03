import React, { Component } from 'react';
import { FormField } from './FormField';
import { RadioButton as RadioInput }  from './base/RadioButton';

export class RadioButton extends Component
{
    constructor(props)
    {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(field, value)
    {
        if(this.props.onChange)
            this.props.onChange(this, this.props.value);
    }

    render()
    {
        return (
            <div className="field">
                <label>
                    <RadioInput name={this.props.name} value={this.props.value} checked={this.props.checked} onChange={this.onChange} />
                    <span className="align middle">{this.props.label}</span>
                </label>
            </div>
        );
    }
}
