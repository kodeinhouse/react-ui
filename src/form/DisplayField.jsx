import React, { Component } from 'react';
import { FormField } from './FormField';
import { Label } from './Label';
import { Text } from '../components/other/Text';

export class DisplayField extends Component
{
    render()
    {
        return (
            <FormField className="display inline">
                <Label width={this.props.labelWidth}>{this.props.label}:</Label>
                <Text>{this.props.children}</Text>
            </FormField>
        );
    }
}
