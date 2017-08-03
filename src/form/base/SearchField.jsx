import React, { Component } from 'react';

export class SearchField extends Component
{
    render()
    {
        return <input type="search" {...this.props}/>;
    }
}
