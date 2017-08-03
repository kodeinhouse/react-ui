import React, { Component } from 'react';
import { Container } from '../container/Container';

export class FieldGroup extends Component
{
    render()
    {
        return (
            <Container {...this.props}>
                {this.props.children}
            </Container>
        );
    }
}
