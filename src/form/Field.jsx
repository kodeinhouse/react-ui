import React, { Component } from 'react';
import { Validator } from './Validator';
import { FormField } from './FormField';
import { Label } from './Label';

export class Field extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            validate: props.validation == 'eager'
        };

        this.validator = new Validator(Object.assign(props.validator || {}, {
            rules: [{
                check: ((field, value) =>
                {
                    return !field.required || (field.required === true && value != null && value.trim().length > 0)
                }),
                message: "This field is required"
            }]
        }));

        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    static get defaultProps()
    {
        return {
            validation: 'eager'
        };
    }

    onBlur(field, value)
    {
        if(!this.state.validate)
            this.setState({validate: true});
    }

    onChange(field, value)
    {
        value = value != '' ? value : null;

        // Having the onChange prop will let us know this is a controlled field
        if(this.props.onChange)
            this.props.onChange(field, value); // We want to deal only with null if it's empty
        else
            this.setState({value: value});
    }

    processValue(value)
    {
        return value != null ? value : ''; // Input shouldn't receive ever a null value
    }

    validate(value)
    {
        let errors = this.validator.run(this.props, value);

        return errors.length > 0 ? errors[0] : null;
    }

    pick(prop, state)
    {
        if(this.props.onChange)
            return prop;
        else
            return state;
    }

    createLabel()
    {
        return <Label>{this.props.label}</Label>;
    }

    createField()
    {
        throw "Not Implemented Exception";
    }

    createMessage()
    {
        return this.props.message ? <div className="message">{this.props.message}</div> : null;
    }

    createError(error)
    {
        // If the user wants to prevent the message tag from being created just need to set the error attribute to true
        // The error displayed will be from the validations, we can modify this later to allow any direct error
        // from outside the component
        return this.props.error !== false ? <div className="error">{error}</div> : null;
    }

    render()
    {
        let value = this.processValue(this.pick(this.props.value, this.state.value));
        let error = this.state.validate ? this.validate(value) : null;

        return (
            <FormField {...this.props} invalid={error != null} >
                {this.createLabel()}
                <div className="wrapper">
                    {this.createField()}
                    {this.createMessage()}
                    {this.createError(error)}
                </div>
            </FormField>
        );
    }
}
