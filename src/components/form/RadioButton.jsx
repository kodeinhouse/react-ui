import React, { Component } from 'react';
import { FormField } from './FormField.jsx';

export class RadioButton extends FormField
{
    static get defaultProps()
    {
        return {
            type: 'radio',
            separator: ':'
        };
    }
    constructor(props)
    {
        super(props);
    }
    createInput()
    {
        let classes = [];

        return (
          <input
            className={classes.join(' ')}
            onChange={this.onChange}
            id={this.props.id}
            type={this.props.type}
            name={this.props.name}
            value={this.props.value}
            checked={this.props.checked}
            onBlur={this.onBlur}
            readOnly={this.props.readOnly}
            disabled={this.props.disabled}/>);
    }
    render()
    {
        return(
            <div className="form-field-radio" style={this.props.style}>
                <label>{this.createInput(this.props.type)}<span>{this.props.label}</span></label>
            </div>
        );
    }
}
