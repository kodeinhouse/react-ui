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
        let style = this.props.style || {};

        if(this.props.className)
            classes.push(this.props.className);

        if(this.props.color)
            classes.push(this.props.color);

        if(this.props.background == 'transparent')
            classes.push('outline');
        else
            if(this.props.background)
                classes.push(this.props.background);

        if(this.props.icon)
            classes.push('icon');

        if(this.props.border)
            style.border = this.props.border;

        if(this.props.width)
            style.width = this.props.width;

        if(this.props.decoration)
            style.textDecoration = this.props.decoration;

        if(this.props.push)
        {
            classes.push('push');
            classes.push(this.props.push);
        }

        if(this.props.padding)
            style.padding = this.props.padding;

        if(this.props.visible === false)
            style.display = 'none';

        return (
            <button id={this.props.id} className={classes.join(' ')} onClick={this.props.onClick} disabled={this.props.disabled} style={style}>
                {this.props.icon ? <i className={`icon ${this.props.icon}`}></i> : null}
                {this.props.children}
            </button>
        );
    }
}
