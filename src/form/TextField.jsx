import React, { Component } from 'react';
import { Field } from './Field';
import { TextField as BaseField } from './base/TextField';

export class TextField extends Field
{

    constructor(props)
    {
        super(props);
    }

    createField()
    {
        let value = this.processValue(this.pick(this.props.value, this.state.value));

        let props = Object.assign({}, {
            name: this.props.name,
            value: value,
            label: this.props.label,
            required: this.props.required,
            maxLength: this.props.maxLength
            disabled: this.props.disabled,
            readOnly: this.props.readOnly,
            placeholder: this.props.placeholder,
            onKeyPress: this.props.onKeyPress,
            onChange: this.onChange,
            onBlur: this.onBlur,
        }, this.getDataAttributes());

        return <BaseField {...props} />;
    }
}
