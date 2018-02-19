import React, { Component } from 'react';

export class Tag extends Component
{
    render()
    {
        let classes = ['tag'];

        if(this.props.className)
            classes.push(this.props.className);

        return <span className={classes.join(' ')}>{this.props.children}</span>;
    }
}
