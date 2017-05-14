import React, { Component } from 'react';

import { Container } from './box/Container';

export class Demo extends Component
{
    render()
    {
        return <Container>
                  <h2>Hello Webpack!</h2>
                </Container>;
    }
}
