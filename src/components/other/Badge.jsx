import React, { Component } from 'react';

export class Badge extends Component
{
    render()
    {
        let classes = ['badge'];

        if(this.props.className)
            classes.push(this.props.className);

        return <span className={classes.join(' ')}>{this.props.children}</span>;
    }
}
