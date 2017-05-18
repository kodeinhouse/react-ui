import React, { Component } from 'react';

export class DisplayText extends Component
{
    render()
    {
        return (
            <div>
                <span className="label">{this.props.label}: </span>
                <span className="value">{this.props.children}</span>
            </div>
        );
    }
}
