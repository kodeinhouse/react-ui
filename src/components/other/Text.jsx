import React, { Component } from 'react';

export class Text extends Component
{
    render()
    {
        let classes = ['text'];

        if(this.props.className)
            classes.push(this.props.className);

        return <span id={this.props.id} className={classes.join(' ')} style={this.props.style}>{this.props.children}</span>;
    }
}
