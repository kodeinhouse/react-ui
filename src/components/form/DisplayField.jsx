import React, { Component } from 'react';
import { FormField } from './FormField.jsx';

export class DisplayField extends FormField
{
    static get defaultProps(){
        return {
            type: 'display',
            flex: true
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
