import React, { Component } from 'react';

export class FormField extends Component
{
    render()
    {
        let classes = ['field'];
        let props = Object.assign({}, this.props);

        if(this.props.className)
            classes.push(this.props.className);

        props.className = classes.join(' ');

        return (
            <div {...props}>
                {this.props.label ? <label>{this.props.label}</label> : null }
                {this.props.children}
            </div>
        );
    }
}
