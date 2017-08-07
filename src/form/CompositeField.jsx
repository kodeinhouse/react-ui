import React, { Component } from 'react';
import { Container } from '../container/Container';

export class CompositeField extends Component
{
    render()
    {
        let classes = ['composite field'];
        let props = Object.assign({}, this.props);

        if(this.props.className)
            classes.push(this.props.className);

        props.className = classes.join(' ');

        return (
            <div {...props}>
                <label>{this.props.label}</label>
                <Container columns="equal">
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
