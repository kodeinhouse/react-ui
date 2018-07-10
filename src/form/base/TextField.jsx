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
        let target = event.target;

        if(this.props.onChange)
            this.props.onChange(this.props, target.value);
    }

    render()
    {
        let { inputRef, ...rest } = this.props;

        return <input ref={inputRef} type="text" {...rest} onChange={this.onChange} />;
    }
}
