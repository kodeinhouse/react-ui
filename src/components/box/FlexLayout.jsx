import React, { Component } from 'react';
import { Container } from './Container';

export class FlexLayout extends Component
{
    render()
    {
        let classes = ['flex-layout'];

        if(this.props.className)
            classes.push(this.props.className);

        return <Container id={this.props.id} className={classes.join(' ')}>{this.props.children}</Container>;
    }
}
