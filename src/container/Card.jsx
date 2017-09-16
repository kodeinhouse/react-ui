import React, { Component } from 'react';
import { Container } from './Container';

export class Card extends Component
{
    render()
    {
        let classes = ['card'];

        if(this.props.className)
            classes.push(this.props.className);

        return (<Container className={classes.join(' ')} style={this.props.style} onClick={this.props.onClick}>
                    {this.props.children}
                </Container>)
    }
}
