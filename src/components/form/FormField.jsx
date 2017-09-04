import React, { Component } from 'react';
import { Field } from './Field';

/*
    @abstract
*/
export class FormField extends Field
{
    static get defaultProps(){
        return {
            showError: false,
            separator: ':'
        };
    }

    constructor(props)
    {
        super(props);

        this.baseClass = 'form-field';
    }

    createMessage()
    {
        if(this.props.showError && this.errors && this.errors.length > 0)
            return <div className="error">{this.errors[0]}</div>;
        else
            return null;
    }

    createLabel(label, className)
    {
        return label ? <div className={className}><label>{label}{this.props.separator}</label></div> : null
    }

    createValue(type, className)
    {
        return (
            <div className={className}>
                {this.createInput(type)}
                {this.createMessage(this.errors)}
            </div>
        );
    }

    render()
    {
        if(!this.props.plain)
        {
            let classes = [this.baseClass, "form-type-" + this.props.type, (this.props.flex ? 'hbox' : ''), (this.props.inline ? 'inline' : '')];
            let { className, align, required} = this.props;
            let style = Object.assign({}, this.props.style);

            if(className && className.length > 0)
                classes.push(className);

            if(align && align.length > 0)
                classes.push(this.baseClass + '-' + align);

            if(required === true)
                classes.push(this.baseClass + '-required');

            if(!this.isValid(this.state.value))
                classes.push(this.baseClass + '-' + 'invalid');

            if(this.props.visible === false)
                style.display = 'none';

            let labelClass = 'form-field-label' + (this.props.flex ? ' hbox-r' : '');
            let valueClass = 'form-field-value' + (this.props.flex ? ' hbox-l' : '');

            let field = this.createLabel(this.props.label, labelClass);
            let value = this.createValue(this.props.type, valueClass);


            return (<div className={classes.join(" ")} style={style}>
                        {field}
                        {value}
                    </div>);
        }
        else
            return super.render();
    }
}
