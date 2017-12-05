import React, { Component } from 'react';
import { FormField } from './FormField';
import { TextArea as BaseField } from './base/TextArea';

export class TextArea extends Component
{
    render()
    {
        return (
            <FormField label={this.props.label}>
                <BaseField name={this.props.name} value={this.props.value} onChange={this.props.onChange} onKeyPress={this.props.onKeyPress} rows={this.props.rows}/>
            </FormField>
        );
    }
}
