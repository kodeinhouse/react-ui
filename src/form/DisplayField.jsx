import React, { Component } from 'react';
import { FormField } from './FormField';
import { Label } from './Label';
import { Text } from '../components/other/Text';

export class DisplayField extends Component
{
    render()
    {
        let classes = ['display'];

        if(this.props.className)
            classes.push(this.props.className)
            
        return (
            <FormField className={classes.join(' ')}>
                <Label width={this.props.labelWidth} align={this.props.labelAlign}>{this.props.label}:</Label>
                <div className="wrapper"><Text>{this.props.children}</Text></div>
            </FormField>
        );
    }
}
