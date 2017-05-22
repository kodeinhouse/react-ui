import React, { Component } from 'react';

export class Button extends Component
{
    static get defaultProps()
    {
        return {
            color: 'default',
            background: 'solid'
        };
    }
    constructor(props)
    {
        super(props);
    }
    render()
    {
        let classes = ['button'];

        if(this.props.className)
            classes.push(this.props.className);

        if(this.props.color)
            classes.push(this.props.color);

        if(this.props.background == 'transparent')
            classes.push('outline');
        else
            if(this.props.background)
                classes.push(this.props.background);

        return <button id={this.props.id} className={classes.join(' ')} onClick={this.props.onClick}>{this.props.children}</button>;
    }
}
