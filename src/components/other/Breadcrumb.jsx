import React, { Component } from 'react';
import { Container } from '../box/Container';

export class Breadcrumb extends Component
{
    render()
    {
        let classes = ['breadcrumb'];

        if(this.props.className)
            classes.push(this.props.className);

        return (<Container className={classes.join(' ')}>
                    {this.props.children}
                </Container>);
    }
}
