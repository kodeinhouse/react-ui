import React, { Component } from 'react';
import { Field } from './Field';
import { NumberField as BaseField } from './base/NumberField';

export class NumberField extends Field
{
    createField()
    {
        let value = this.processValue(this.pick(this.props.value, this.state.value));

        let props = Object.assign({}, this.props, {value: value});

        return <BaseField {...props} />;
    }
}
