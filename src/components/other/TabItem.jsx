import React, { Component } from 'react';
import { Container } from '../box/Container';

export class TabItem extends Component
{
    render()
    {
        let classes = ['tab-item', this.props.theme]
        return  <Container className={classes.join(' ')}>
                    {this.props.children}
                </Container>;
    }
}

TabItem.defaultProps = {
    theme: 'neutral'
};
