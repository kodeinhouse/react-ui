import React, { Component } from 'react';

export class Link extends Component
{
    render()
    {
        return <a id={this.props.id} className="link">{this.props.children}</a>;
    }
}
