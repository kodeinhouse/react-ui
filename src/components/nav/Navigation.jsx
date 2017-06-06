import React, { Component } from 'react';

export class Navigation extends Component
{
    render()
    {
        let style = Object.assign({}, this.props.style);
        let classes = [];

        // If a region was giving it means this component is being used inside a flex layout
        // So instead of assigning to the width property we use the flexBasis
        if(this.props.region && this.props.width)
            style.flexBasis = this.props.width;

        if(this.props.className)
            classes.push(this.props.className);

        if(this.props.region)
            classes.push('region-' + this.props.region);

        return <nav id={this.props.id} className={classes.join(' ')} style={style}>{this.props.children}</nav>;
    }
}
