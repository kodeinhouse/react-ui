import React, { Component } from 'react';

export class Text extends Component
{
    render()
    {
        return <span id={this.props.id} className={this.props.className}>{this.props.children}</span>;
    }
}
