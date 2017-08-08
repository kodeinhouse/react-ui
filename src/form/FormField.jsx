import React, { Component } from 'react';

export class FormField extends Component
{
    constructor(props)
    {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(field, value)
    {
        if(this.props.onChange)
            this.props.onChange(field, value);
    }

    render()
    {
        let classes = ['field'];
        let props = Object.assign({}, this.props);

        if(this.props.className)
            classes.push(this.props.className);

        props.className = classes.join(' ');

        return (
            <div className={props.className} style={props.style}>
                {this.props.label ? <label>{this.props.label}</label> : null }
                {this.props.children}
            </div>
        );
    }
}
