import React, { Component } from 'react';

export class RadioButton extends Component
{
    constructor(props)
    {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event)
    {
        if(this.props.onChange)
            this.props.onChange(this, event.target.value);
    }

    render()
    {
        return <input   type="radio"
                        name={this.props.name}
                        value={this.props.value}
                        checked={this.props.checked} 
                        onChange={this.onChange} />;
    }
}
