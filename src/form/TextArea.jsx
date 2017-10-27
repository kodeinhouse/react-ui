import React, { Component } from 'react';
import { FormField } from './FormField';
import { TextArea as TextAreaInput } from './base/TextArea';

export class TextArea extends Component
{
    render()
    {
        return (
            <FormField label={this.props.label}>
                <TextAreaInput value={this.props.value} onChange={this.props.onChange} onKeyPress={this.props.onKeyPress}/>
            </FormField>
        );
    }
}
