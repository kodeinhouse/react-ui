import React, { Component } from 'react';

export class Text extends Component
{
    render()
    {
        return <span id={this.props.id} className={this.props.className} style={this.props.style}>{this.props.children}</span>;
    }
}
