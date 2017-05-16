import React, { Component } from 'react';

export class Link extends Component
{
    render()
    {
        return <a id={this.props.id} className="link" href={this.props.path} onClick={this.props.onClick}>{this.props.children}</a>;
    }
}
