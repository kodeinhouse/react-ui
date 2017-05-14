import React, { Component } from 'react';

export class Icon extends Component
{
    render()
    {
        let classes = ['icon'];

        if(this.props.className)
            classes.push(this.props.className);

        return <i className={classes.join(' ')}></i>;
    }
}
