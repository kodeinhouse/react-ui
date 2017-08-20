import React, { Component } from 'react';
import { Field } from './Field';
import { Dropdown as BaseField } from './base/Dropdown';

export class Dropdown extends Field
{
    createField()
    {
        return <BaseField
                    name={this.props.name}
                    value={this.props.value}
                    label={this.props.label}
                    options={this.props.options}
                    onChange={this.props.onChange} />;
    }
}
