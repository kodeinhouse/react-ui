import React, { Component } from 'react';
import { FormField } from './FormField';
import { TextField as TextInput } from './base/TextField';

export class TextField extends Component
{
    render()
    {
        return (
            <FormField {...this.props}>
                <TextInput />
            </FormField>
        );
    }
}
