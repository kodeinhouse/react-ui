import React, { Component } from 'react';

export class Container extends Component
{
    render()
    {
        let classes = [];
        let style = Object.assign({}, this.props.style || {});

        if(this.props.className)
            classes.push(this.props.className);

        if(this.props.align)
            classes.push(this.props.align);

        if(this.props.region)
            classes.push('region-' + this.props.region);

        if(this.props.scrollable === false)
            style.overflow = 'hidden';

        if(this.props.scrollable === true)
            style.overflow = 'auto';

        if(this.props.scrollableY === true)
            style.overflowY = 'auto';

        if(this.props.scrollableX === true)
            style.overflowX = 'auto';
                
        return <div id={this.props.id} className={classes.join(' ')} style={style}>{this.props.children}</div>;
    }
}
