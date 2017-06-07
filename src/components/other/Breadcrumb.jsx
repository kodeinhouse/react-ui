import React, { Component } from 'react';
import { Container } from '../box/Container';

export class Breadcrumb extends Component
{
    createCrumbs(paths)
    {
        let length = paths.length;

        for (let i = 1; i < length; i+=2) {
            paths.splice(i, 0, <span> / </span>);
        }

        return paths;
    }

    render()
    {
        let classes = ['breadcrumb'];
        let children = this.props.children || this.createCrumbs(this.props.paths);

        if(this.props.className)
            classes.push(this.props.className);

        return (<Container className={classes.join(' ')} region={this.props.region}>
                    {children}
                </Container>);
    }
}
