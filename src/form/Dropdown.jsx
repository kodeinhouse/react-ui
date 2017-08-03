import React, { Component } from 'react';
import { FormField } from './FormField';
import { Dropdown as DropdownInput } from './base/Dropdown';

export class Dropdown extends Component
{
    render()
    {
        return (
            <FormField label={this.props.label}>
                <DropdownInput options={this.props.options}/>
            </FormField>
        );
    }
}
