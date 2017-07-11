import React, { Component } from 'react';

export class MenuItem extends Component
{
    render()
    {
        let classes = ['item']

        if(this.props.active)
            classes.push('active');

        if(this.props.expanded)
            classes.push('expanded');
            
        return <li id={this.props.id} className={classes.join(' ')}>{this.props.children}</li>;
    }
}
