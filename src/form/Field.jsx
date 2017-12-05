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
            value: props.value,
            validate: props.validation == 'eager'
        };

        this.validator = new Validator(Object.assign(props.validator || {}, {
            rules: [{
                check: ((field, value) =>
                {
                    return !field.required || (field.required === true && value != null && value.toString().trim().length > 0)
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
            validation: 'eager',
            error: true // By default the error is displayed
        };
    }

    onBlur(event)
    {
        if(!this.state.validate)
            this.setState({validate: true});

        if(this.props.onBlur)
            this.props.onBlur(event);
    }

    onChange(field, value)
    {
        value = (value !== '' ? value : null);

        // Having the onChange prop will let us know this is a controlled field
        if(this.props.onChange)
            this.props.onChange(field, value); // We want to deal only with null if it's empty
        else
            this.setState({value: value});
    }

    componentWillReceiveProps(nextProps)
    {
        if(!nextProps.onChange)
            this.setState({value: nextProps.value});
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
        // If the field has the onChange it means that it's controlled
        // So we read from the prop instead the state
        if(this.props.onChange)
            return prop;
        else
            return state;
    }

    createLabel()
    {
        if(this.props.label)
            return <Label width={this.props.labelWidth} >{this.props.label}</Label>;
        else
            return null;
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

        // If the user wants to prevent the error from being displayed the error property can be set to false
        return this.props.error !== false && error != null ? <div className="error">{error}</div> : null;
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
