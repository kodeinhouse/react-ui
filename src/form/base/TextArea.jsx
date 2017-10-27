import React, { Component } from 'react';

export class TextArea extends Component
{
    constructor(props)
    {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event)
    {
        let target = event.target;

        if(this.props.onChange)
            this.props.onChange(this.props, target.value);
    }

    render()
    {
        return (
            <textarea value={this.props.value} onChange={this.onChange} onKeyPress={this.props.onKeyPress} />
        );
    }
}
