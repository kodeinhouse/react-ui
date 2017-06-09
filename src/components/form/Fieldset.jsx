import React, { Component } from 'react';
import { Container } from '../box/Container.jsx';

export class Fieldset extends Container
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let props = Object.assign({}, this.props);

        if(props.className)
            props.className = ['fieldset', props.className].join(' ');
        else
            props.className = 'fieldset';

        return <Container {...props}>{this.props.children}</Container>
    }
}

Fieldset.defaultProps = {
    type: 'fieldset'
};
