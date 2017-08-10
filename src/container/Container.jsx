import React, { Component } from 'react';

export class Container extends Component
{
    render()
    {
        let classes = [];
        let style = Object.assign({}, this.props.style || {});

        if(this.props.className)
            classes.push(this.props.className);

        if(this.props.layout)
            classes.push('layout-' + this.props.layout);

        if(this.props.orientation)
            classes.push(this.props.orientation);

        if((this.props.columns == 'equal' || this.props.layout == 'flex') && this.props.align)
        {
            if(this.props.align == 'bottom')
                style.alignItems = 'flex-end';
            else
                if(this.props.align == 'top')
                    style.alignItems = 'flex-start';
                else
                    style.alignItems = this.props.align;
        }
        else
            if(this.props.align)
                classes.push(this.props.align);

        if(this.props.justify)
            style.justifyContent = this.props.justify;

        if(this.props.wrap)
            style.flexWrap = 'wrap';

        if(this.props.flex)
            style.flex = this.props.flex;

        if(this.props.grow === true)
            style.flexGrow = '1';
        else
            if(this.props.grow)
                style.flexGrow = this.props.grow;

        if(this.props.shrink === true)
            style.flexShrink = 1;
        else
            if(this.props.shrink === false)
                style.flexShrink = 0;

        if(this.props.region)
            classes.push('region-' + this.props.region);

        if(this.props.overflow === false)
            style.overflow = 'hidden';
            
        if(this.props.scrollable === false)
            style.overflow = 'hidden';

        if(this.props.scrollable === true)
            style.overflow = 'auto';

        if(this.props.scrollableY === true)
            style.overflowY = 'auto';

        if(this.props.scrollableX === true)
            style.overflowX = 'auto';

        if(this.props.width)
            style.width = this.props.width;

        if(this.props.height)
            style.height = this.props.height;

        if(this.props.minWidth)
            style.minWidth = this.props.minWidth;

        if(this.props.margin)
            style.margin = this.props.margin;

        if(this.props.columns)
            classes.push(this.props.columns);

        return <div id={this.props.id} className={classes.join(' ')} style={style}>{this.props.children}</div>;
    }
}