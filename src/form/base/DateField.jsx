import React, { Component } from 'react';

export class DateField extends Component
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
        let { inputRef, ...rest } = this.props;

        return <input type="date" {...rest} onChange={this.onChange} />;
    }
}
