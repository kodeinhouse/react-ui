import React, { Component } from 'react';
import { FormField } from './FormField';
import { CheckBox as BaseField } from './base/CheckBox';

export class CheckBox extends Component
{
    render()
    {
        let classes = ['field'];

        if(this.props.className)
            classes.push(this.props.className);

        let label = <span className="align middle">{this.props.label}</span>;
        let leftSide = null, rightSide = null;

        if(this.props.labelAlign == 'left')
            leftSide = label;
        else
            if(this.props.labelAlign == 'right')
                rightSide = label;

        return (
            <div className={classes.join(' ')} style={this.props.style}>
                <label>
                    {leftSide}
                    <BaseField
                        name={this.props.name}
                        checked={this.props.checked}
                        label={this.props.label}
                        required={this.props.required}
                        disabled={this.props.disabled}
                        readOnly={this.props.readOnly}
                        placeholder={this.props.placeholder}
                        onKeyPress={this.props.onKeyPress}
                        onChange={this.props.onChange}
                        onBlur={this.props.onBlur} />
                    {rightSide}
                </label>
            </div>
        );
    }
}
