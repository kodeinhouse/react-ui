import React, { Component } from 'react';

export class Text extends Component
{
    render()
    {
        let classes = ['text'];
        let style = Object.assign({}, this.props.style);

        if(this.props.className)
            classes.push(this.props.className);

        if(this.props.fontSize)
            style.fontSize = this.props.fontSize;

        if(this.props.marginLeft)
            style.marginLeft = this.props.marginLeft;

        return <span id={this.props.id} className={classes.join(' ')} style={style}>{this.props.children}</span>;
    }
}
