import React, { Component } from 'react';

export class Navigation extends Component
{
    render()
    {
        return <nav id={this.props.id}>{this.props.children}</nav>;
    }
}
