import React, { Component } from 'react';
import { FormField } from './FormField';
import { CheckBox as CheckInput } from './base/CheckBox';

export class CheckBox extends Component
{
    render()
    {
        return (
            <div className="field">
                <label><CheckInput /><span className="align middle">{this.props.label}</span></label>
            </div>
        );
    }
}
