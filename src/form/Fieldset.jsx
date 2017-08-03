import React, { Component } from 'react';
import { Container } from '../container/Container';

export class Fieldset extends Component
{
    render()
    {
        return (
            <fieldset {...this.props}>
                {this.props.children}
            </fieldset>
        );
    }
}
