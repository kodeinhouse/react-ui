import React, { Component } from 'react';
import { FormField } from './FormField';

export class CheckBox extends FormField
{
    static get defaultProps(){
        return {
            type: 'checkbox'
        };
    }

    getDOMValue(input)
    {
        return input.checked;
    }

    createInput(type, align)
    {
        let classes = [];

        return (
          <input
            className={classes.join(' ')}
            onChange={this.onChange}
            id={this.props.id}
            type={this.props.type}
            maxLength={this.props.maxLength}
            name={this.props.name}
            checked={this.state.value}
            onBlur={this.onBlur}
            readOnly={this.props.readOnly}
            disabled={this.props.disabled}/>);
    }
}
