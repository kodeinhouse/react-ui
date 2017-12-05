import React, { Component } from 'react';
import { Container } from './Container';

export class Card extends Component
{
    render()
    {
        let props = Object.assign({}, this.props);
        let classes = ['card'];

        if(this.props.className)
            classes.push(this.props.className);

        props.className = classes.join(' ');

        return (<Container {...props}>
                    {this.props.children}
                </Container>)
    }
}
