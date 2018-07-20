import React, { Component } from 'react';
import { Container } from './Container';

export class Porlet extends Component
{
    render()
    {
        let classes = ['porlet'];
        let { className, ...rest } = this.props;

        if(className)
            classes.push(className);

        return  <Container className={classes.join(' ')} {...rest}>
                    <h4 className="title">{this.props.title}</h4>
                    {this.props.children}
                </Container>
    }
}
