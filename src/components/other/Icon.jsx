import React, { Component } from 'react';

export class Icon extends Component
{
    render()
    {
        let classes = ['icon'];
        let style = this.props.style || {};

        if(this.props.className)
            classes.push(this.props.className);

        if(this.props.padding)
            style.padding = this.props.padding;

        return <i className={classes.join(' ')} style={style}></i>;
    }
}
