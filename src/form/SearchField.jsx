import React, { Component } from 'react';
import { Field } from './Field';
import { SearchField as BaseField } from './base/SearchField';

export class SearchField extends Field
{
    createField()
    {
        let value = this.processValue(this.pick(this.props.value, this.state.value));

        return <BaseField
                    id={this.props.id}
                    name={this.props.name}
                    value={value}
                    onKeyPress={this.props.onKeyPress}
                    label={this.props.label}
                    required={this.props.required}
                    disabled={this.props.disabled}
                    readOnly={this.props.readOnly}
                    placeholder={this.props.placeholder}
                    onChange={this.onChange}
                    onKeyPress={this.props.onKeyPress}
                    onKeyDown={this.props.onKeyDown}
                    onKeyUp={this.props.onKeyUp}
                    onBlur={this.onBlur} />;
    }
}
