import React, { Component } from 'react';

export class CheckBox extends Component
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
            this.props.onChange(this.props, target.checked);
    }

    render()
    {
        return <input type="checkbox"  {...this.props} onChange={this.onChange} />;
    }
}
