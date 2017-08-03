import React, { Component } from 'react';

export class FormField extends Component
{
    render()
    {
        let classes = ['field'];

        if(this.props.className)
            classes.push(this.props.className);

        return (
            <div className={classes.join(' ')}>
                <label>{this.props.label}</label>
                {this.props.children}
            </div>
        );
    }
}
