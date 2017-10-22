import React, { Component } from 'react';

export class Label extends Component
{
    render()
    {
        let classes = [];
        let style = Object.assign({}, this.props);

        if(this.props.className)
            classes.push(this.props.className);

        if(this.props.width)
            style.width = this.props.width;

        return <label id={this.props.id} className={classes.join(' ')} style={style}>{this.props.children}</label>;
    }
}
