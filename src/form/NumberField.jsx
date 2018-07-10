import React, { Component } from 'react';
import { Field } from './Field';
import { NumberField as BaseField } from './base/NumberField';

export class NumberField extends Field
{
    createField()
    {
        let value = this.processValue(this.pick(this.props.value, this.state.value));

        let props = Object.assign({}, {
            name: this.props.name,
            value: value,
            label: this.props.label,
            required: this.props.required,
            disabled: this.props.disabled,
            readOnly: this.props.readOnly,
            placeholder: this.props.placeholder,
            onKeyPress: this.props.onKeyPress,
            onChange: this.onChange,
            onBlur: this.onBlur,
            inputRef: this.props.inputRef
        }, this.getDataAttributes());

        return <BaseField {...props} />;
    }
}
