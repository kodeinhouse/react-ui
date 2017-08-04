import React, { Component } from 'react';
import { Container } from './Container';

export class Porlet extends Component
{
    render()
    {
        let classes = ['porlet'];

        if(this.props.className)
            classes.push(this.props.className);

        return  <Container className={classes.join(' ')}>
                    <h4 className="title">{this.props.title}</h4>
                    {this.props.children}
                </Container>
    }
}
