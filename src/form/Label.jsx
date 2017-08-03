import React, { Component } from 'react';

export class Label extends Component
{
    render()
    {
        let classes = [];

        if(this.props.className)
            classes.push(this.props.className);

        return <legend id={this.props.id} className={classes.join(' ')} style={this.props.style}>{this.props.children}</legend>;
    }
}
