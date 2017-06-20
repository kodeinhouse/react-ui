import React, { Component } from 'react';
import { FormField } from './FormField.jsx';

export class NoteField extends FormField
{
    static get defaultProps()
    {
        return {
            type: 'note',
            separator: ':'
        };
    }

    constructor(props)
    {
        super(props);
    }

    getInput(node)
    {
        return node.querySelector('textarea');
    }

    createInput()
    {
        return (<textarea id={this.props.id} name={this.props.name} value={this.state.value} rows={this.props.rows} onChange={this.onChange} readOnly={this.props.readOnly} disabled={this.props.disabled}/>);
    }
}
