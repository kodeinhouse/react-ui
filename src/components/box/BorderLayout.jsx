import React, { Component } from 'react';
import { Container } from './Container';

export class BorderLayout extends Component
{
    static get defaultProps()
    {
        return {

        };
    }
    render()
    {
        let classes = ['border-layout'];
        let style = Object.assign({}, this.props.style || {});

        if(this.props.size)
            classes.push(this.props.size);

        if(this.props.className)
            classes.push(this.props.className);

        if(this.props.align)
            style.alignItems = this.props.align;

        if(this.props.justify)
            style.justifyContent = this.props.justify;

        return <Container id={this.props.id} className={classes.join(' ')} style={style}>{this.props.children}</Container>;
    }
}
