import React, { Component } from 'react';

export class Container extends Component
{
    render()
    {
        return <div id={this.props.id} className={this.props.className}>{this.props.children}</div>;
    }
}
