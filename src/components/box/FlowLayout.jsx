import React, { Component } from 'react';
import { Container } from './Container';

export class FlowLayout extends Component
{
    render()
    {
        let classes = ['flow-layout'];
        let style = Object.assign({}, this.props.style || {});

        if(this.props.className)
            classes.push(this.props.className);

        if(this.props.margin)
            style.margin = '-' + this.props.margin;

        return <Container className="flow-wrapper">
                    <Container id={this.props.id} className={classes.join(' ')} style={style}>{this.props.children}</Container>
                </Container>;
    }
}
