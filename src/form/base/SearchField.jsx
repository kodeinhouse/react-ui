import React, { Component } from 'react';

export class SearchField extends Component
{
    constructor(props)
    {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onKeyPress(event)
    {
        if(this.props.onKeyPress)
            this.props.onKeyPress(event);
    }

    onChange(event)
    {
        let target = event.target;

        if(this.props.onChange)
            this.props.onChange(this.props, target.value);
    }

    render()
    {
        return <input type="search"
                        {...this.props}
                        onChange={this.onChange}
                        onKeyPress={this.onKeyPress} />;
    }
}
