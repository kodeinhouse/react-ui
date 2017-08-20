import React, { Component } from 'react';
import { Field } from './Field';
import { TextField as BaseField } from './base/TextField';

export class SpinnerField extends Field
{
    constructor(props)
    {
        super(props);

        this.state = {
            value: props.value
        };

        this.onIncrement = this.onIncrement.bind(this);
        this.onDecrement = this.onDecrement.bind(this);
    }

    static get defaultProps()
    {
        return {
            value: 1,
            step: 1,
            min: -Number.MAX_VALUE,
            max: +Number.MAX_VALUE,
            template: '{number}'
        };
    }

    onIncrement()
    {
        let value = this.getValue() + this.props.step;

        if(value <= this.props.max)
            this.onChange(this.props, value);
    }

    onDecrement()
    {
        let value = this.getValue() - this.props.step;

        if(value >= this.props.min)
            this.onChange(this.props, value);
        else
            return;
    }

    getValue()
    {
        return this.pick(this.props.value, this.state.value);
    }

    createField()
    {
        let value = this.processValue(this.pick(this.props.value, this.state.value));

        return (
            <div className="spinner">
                <button className="decrement" onClick={this.onDecrement}></button>
                <BaseField
                            name={this.props.name}
                            value={this.props.template.replace('{number}', value)}
                            label={this.props.label}
                            required={this.props.required}
                            disabled={this.props.disabled}
                            readOnly={this.props.readOnly}
                            placeholder={this.props.placeholder}
                            onChange={this.onChange}
                            onBlur={this.onBlur} />
                <button className="increment" onClick={this.onIncrement}></button>
            </div>
        );
    }
}
