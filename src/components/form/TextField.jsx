import React, { Component } from 'react';
import { FormField } from './FormField.jsx';

export class TextField extends FormField
{
    static get defaultProps()
    {
        return {
            type: 'text',
            separator: ':'
        };
    }

    constructor(props)
    {
        super(props);
    }
}
