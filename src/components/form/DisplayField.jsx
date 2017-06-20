import React, { Component } from 'react';
import { FormField } from './FormField.jsx';

export class DisplayField extends FormField
{
    static get defaultProps(){
        return {
            type: 'display',
            flex: true,
            separator: ':'
        };
    }
    constructor(props)
    {
        super(props);
    }
    createInput()
    {
        return this.props.children;
    }
}
