import React, { Component } from 'react';

export class TextField extends Component
{
    constructor(props)
    {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event)
    {
        if(this.props.onChange)
            this.props.onChange(this.props, event.target.value);
    }

    render()
    {
        let props = Object.assign({}, this.props);

        props.onChange = this.onChange;

        return <input type="text" {...props}/>;
    }
}
