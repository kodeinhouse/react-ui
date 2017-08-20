import React, { Component } from 'react';
import { Field } from './Field';
import { DateField as BaseField } from './base/DateField';

export class DateField extends Field
{
    processValue(value)
    {
        if(value != null)
            return value instanceof Date ? value.toISOString().split("T")[0] : value;
        else
            return '';
    }

    createField()
    {
        let value = this.processValue(this.pick(this.props.value, this.state.value));

        return <BaseField
                    name={this.props.name}
                    value={value}
                    label={this.props.label}
                    required={this.props.required}
                    disabled={this.props.disabled}
                    readOnly={this.props.readOnly}
                    placeholder={this.props.placeholder}
                    onChange={this.onChange}
                    onBlur={this.onBlur} />;
    }
}
