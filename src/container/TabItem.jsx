import React, { Component } from 'react';
import { Container } from './Container';
import { clone } from 'lodash';

export class TabItem extends Component
{
    render()
    {
        let classes = ['tab-item', this.props.theme];

        let props = Object.assign(clone(this.props), {className: classes.join(' '), region: 'center'});

        if(!props.active)
            props.style = Object.assign(props.style || {}, {display: 'none'});

        return  <Container {...props}>
                    {this.props.children}
                </Container>;
    }
}

TabItem.defaultProps = {
    theme: 'neutral'
};
