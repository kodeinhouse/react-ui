import React, { Component } from 'react';
import { TextField } from './TextField.jsx';
import ReactDOM from 'react-dom';

export class NumberField extends TextField
{
    static get defaultProps()
    {
        return {
            type: 'text',
            align: 'right',
            minValue: Number.MIN_VALUE,
            maxValue: Number.MAX_VALUE,
            allowNegative: true,
            decimals: 2,
            value: '',
            default: ''
        };
    }

    constructor(props)
    {
        super(props);

        this.state = {
            value: this.formatValue(props.value)
        };

        this.allowNegative = this.props.minValue < 0 || !this.props.minValue;
        this.tabIndex = this.props.readOnly ? -1 : null;
        this.baseClass = 'form-field';
        this.getValue = this.getValue.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);

        this.validator = new Validator({
            rules: [{
                check: ((field, value) => { return !field.props.required || (field.props.required === true && !isNaN(parseFloat(value)))}),
                message: "This field is required"
            },
            {
                check: ((field, value) => { return value >= this.props.minValue; }),
                message: "Value can't be less than " + this.props.minValue
            },
            {
                check: ((field, value) => { return value <= this.props.maxValue; }),
                message: "Value can't be greater than " + this.props.maxValue
            }]
        });
    }

    componentWillReceiveProps(props)
    {
        if(this.isFocused())
            this.setDOMValue(this.parseValue(props.value));
        else
            this.setDOMValue(this.formatValue(props.value));
    }

    isFocused()
    {
        return document.activeElement == ReactDOM.findDOMNode(this).querySelector("input");
    }

    getValue()
    {
        let value = this.parseValue(this.state.value);

        return value || value === 0 ? value : null;
    }

    getInt()
    {
        let value = this.getValue() || 0;

        return parseInt(value);
    }

    getFloat()
    {
        let value = this.getValue() || 0;

        return parseFloat(parseFloat(value).toFixed(this.props.decimals));
    }

    parseValue(value)
    {
        // TODO: Add international support
        let result = value != null && value.toString().length > 0 ? value.toString().replace('$', '').replace(/\,/g, '') : '';

        return result;
    }

    setValue(value)
    {
        // TODO: Validate this function. Value has to be a number.
        this.setDOMValue(this.formatValue(value));
    }

    formatValue(value)
    {
        console.log(this.props.default);
        
        value = value || value === 0 ? value : this.props.default;

        let isNumber = !isNaN(value = parseFloat(value));

        if(isNumber)
        {
            let config = {};

            if(this.props.currency)
            {
                config.style = 'currency';
                config.currency = this.props.currency;
            }

            config.minimumFractionDigits = this.props.decimals;
            config.maximumFractionDigits = this.props.decimals;

            return value.toLocaleString('en-US', config);
        }
        else
            return '';
    }

    onFocus(event)
    {
        this.setDOMValue(this.parseValue(this.state.value));
    }

    onBlur(event)
    {
        this.setDOMValue(this.formatValue(this.state.value));

        if(this.props.onBlur)
            this.props.onBlur(this, this.parseValue(this.state.value));
    }

    onChange(event)
    {
        let value = event.target.value;

        if(value.indexOf('-') > 0)
            value = '-' + value.replace('-', '');

        this.setDOMValue(value);

        if(this.props.onChange != null)
            this.props.onChange(this, value);
    }

    onKeyPress(event)
    {
        let nativeEvent = event.nativeEvent;

        if(!(nativeEvent.keyCode >= 48 && nativeEvent.keyCode <= 57))
        {
            let value = event.target.value;

            if(!(event.key == '-' && this.allowNegative && value.indexOf('-') == -1))
            {
                if(!(event.key == '.' && this.props.decimals > 0 && value.length > 0 && value.indexOf('.') == -1))
                {
                    if(event.key != 'Enter')
                    {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }
            }
        }
    }

    isValid(value)
    {
        value = this.parseValue(arguments.length > 0 ? value : this.state.value);

        this.errors = this.validator.run(this, value);

        return this.errors.length == 0;
    }

    createInput(type, align)
    {
        let classes = [];

        return (
          <input type={this.props.type}
                 value={this.state.value}
                 name={this.props.name}
                 min={this.props.min}
                 maxLength={this.props.maxLength}
                 onChange={this.onChange}
                 onFocus={this.onFocus}
                 onBlur={this.onBlur}
                 onKeyPress={this.onKeyPress}
                 className={classes.join(' ')}
                 placeholder={this.props.placeholder}
                 readOnly={this.props.readOnly}
                 disabled={this.props.disabled}
                 tabIndex={this.tabIndex}/>);
    }
}

class Validator
{
    constructor(props)
    {
        this.rules = props.rules || [];
    }

    run(field, value)
    {
        let errors = [];

        this.rules.forEach(function(rule){
            if(!rule.check(field, value))
                errors.push(rule.message);
        });

        return errors;
    }
}
