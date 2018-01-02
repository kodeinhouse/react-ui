import React, { Component } from 'react';

export class NumberField extends Component
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
        return <input type="number" {...this.props} onChange={this.onChange} />;
    }
}
