import React, { Component } from 'react';
import { Container } from './Container';

export class ColumnLayout extends Component
{
    render()
    {
        let classes = ['column-layout', 'auto'];
        let style = Object.assign({}, this.props.style || {});

        return (
            <Container id={this.props.id} className={classes.join(' ')} style={style}>
                {this.props.children}
            </Container>
        );
    }
}
