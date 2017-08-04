import React, { Component } from 'react';

export class Menu extends Component
{
    render()
    {
        let classes = ['menu'];

        if(this.props.className)
            classes.push(this.props.className);

        return <ul id={this.props.id} className={classes.join(' ')}>{this.props.children}</ul>;
    }
}
