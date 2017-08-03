import React, { Component } from 'react';

export class Menu extends Component
{
    render()
    {
        return <ul id={this.props.id} className="menu">{this.props.children}</ul>;
    }
}
