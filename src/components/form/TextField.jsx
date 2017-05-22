import React, { Component } from 'react';
import { FormField } from './FormField.jsx';

export class TextField extends FormField
{
    constructor(props)
    {
        super(props);
    }
}

TextField.defaultProps = {
    type: 'text'
};
