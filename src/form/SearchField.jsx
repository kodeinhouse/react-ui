import React, { Component } from 'react';
import { Field } from './Field';
import { SearchField as BaseField } from './base/SearchField';

export class SearchField extends Field
{
    /*render()
    {
        let props = Object.assign({value: ''}, this.props);

        return (
            <FormField {...this.props}>
                <BaseField {...props}/>
            </FormField>
        );
    }*/

    createField()
    {
        let value = this.processValue(this.pick(this.props.value, this.state.value));

        return <BaseField
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
                    onBlur={this.onBlur} />;
    }
}
