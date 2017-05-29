import React, { Component } from 'react';

export class Navigation extends Component
{
    render()
    {
        return <nav id={this.props.id} className={this.props.className} style={this.props.style}>{this.props.children}</nav>;
    }
}
