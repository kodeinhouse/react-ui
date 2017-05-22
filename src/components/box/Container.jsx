import React, { Component } from 'react';

export class Container extends Component
{
    render()
    {
        let classes = [];

        if(this.props.className)
            classes.push(this.props.className);

        if(this.props.align)
            classes.push(this.props.align);

        return <div id={this.props.id} className={classes.join(' ')} style={this.props.style}>{this.props.children}</div>;
    }
}
