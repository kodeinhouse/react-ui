import React, { Component } from 'react';
import { Container } from './Container';

export class FlowLayout extends Component
{
    render()
    {
        let classes = ['flow-layout'];
        let style = Object.assign({}, this.props.style || {});

        if(this.props.className)
            classes.push(this.props.className);

        if(this.props.margin)
            style.margin = '-' + this.props.margin;

        if(this.props.align)
            style.alignItems = this.props.align;

        if(this.props.justify)
            style.justifyContent = this.props.justify;

        if(this.props.region)
            classes.push('region-' + this.props.region);

        return <Container className="flow-wrapper" style={{overflow: 'auto'}}>
                    <Container id={this.props.id} className={classes.join(' ')} style={style}>{this.props.children}</Container>
                </Container>;
    }
}
