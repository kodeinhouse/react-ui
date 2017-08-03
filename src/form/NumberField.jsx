import React, { Component } from 'react';
import { FormField } from './FormField';
import { NumberField as NumberInput } from './base/NumberField';

export class NumberField extends Component
{
    render()
    {
        return (
            <FormField {...this.props}>
                <NumberInput />
            </FormField>
        );
    }
}
