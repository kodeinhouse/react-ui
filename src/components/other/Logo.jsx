import React, { Component } from 'react';
import { Container } from 'components';

export class Logo extends Component
{
    render()
    {
        return (
            <Container id="main-logo" {...this.props}>
                <img className="media" src={this.props.image}/>
            </Container>
        );
    }
}
