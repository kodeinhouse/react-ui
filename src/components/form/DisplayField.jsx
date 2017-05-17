import React, { Component } from 'react';
import { FormField } from './FormField.jsx';

export class DisplayField extends FormField
{
    constructor(props)
    {
        super(props);
    }
    createInput()
    {
        return this.props.children;
    }
}

DisplayField.defaultProps = {
    type: 'display'
};
