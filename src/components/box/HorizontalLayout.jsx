import React, { Component } from 'react';
import { Container } from './Container';

export class HorizontalLayout extends Component
{
    static get defaultProps()
    {
        return {
            scrollable: false
        };
    }
    render()
    {
        let classes = ['horizontal-layout'];
        let style = Object.assign({}, this.props.style || {});

        if(this.props.size)
            classes.push(this.props.size);

        if(this.props.className)
            classes.push(this.props.className);

        if(this.props.align)
            style.alignItems = this.props.align;

        if(this.props.justify)
            style.justifyContent = this.props.justify;

        if(this.props.scrollable === false)
            style.overflow = 'hidden';

        if(this.props.scrollable === true)
            style.overflow = 'auto';

        if(this.props.scrollableY === true)
            style.overflowY = 'auto';

        if(this.props.scrollableX === true)
            style.overflowX = 'auto';

        if(this.props.region)
            classes.push('region-' + this.props.region);

        return <Container id={this.props.id} className={classes.join(' ')} style={style}>{this.props.children}</Container>;
    }
}
