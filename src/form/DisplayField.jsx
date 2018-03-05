import React, { Component } from 'react';
import { FormField } from './FormField';
import { Label } from './Label';
import { Text } from '../components/other/Text';

export class DisplayField extends Component
{
    static get defaultProps()
    {
        return {
            inline: true,
            stacked: false
        };
    }

    render()
    {
        let classes = ['display'];

        if(this.props.className)
            classes.push(this.props.className)

        if(this.props.inline && !this.props.stacked)
            classes.push('inline');

        console.log(this.props.labelWidth);

        return (
            <FormField className={classes.join(' ')}>
                {this.props.label && (<Label width={this.props.labelWidth} align={this.props.labelAlign}>{this.props.label}:</Label>)}
                <div className="wrapper"><Text>{this.props.children}</Text></div>
            </FormField>
        );
    }
}
