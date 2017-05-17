import React, { Component } from 'react';
import { Field } from './Field';

/*
    @abstract
*/
export class FormField extends Field
{
    constructor(props)
    {
        super(props);

        this.baseClass = 'form-field';
    }
    render()
    {
        if(!this.props.plain)
        {
            let classes = [this.baseClass, "form-type-" + this.props.type, (this.props.flex ? 'hbox' : '')];
            let { className, align, required} = this.props;

            if(className && className.length > 0)
                classes.push(className);

            if(align && align.length > 0)
                classes.push(this.baseClass + '-' + align);

            if(required === true)
                classes.push(this.baseClass + '-required');

            if(!this.isValid(this.state.value))
                classes.push(this.baseClass + '-' + 'invalid');

            let labelClass = 'form-field-label' + (this.props.flex ? ' hbox-r' : '');
            let valueClass = 'form-field-value' + (this.props.flex ? ' hbox-l' : '');

            let field = this.props.label ? <div className={labelClass}><label>{this.props.label}:</label></div> : null;
            let value = <div className={valueClass}>{this.createInput(this.props.type)}</div>;

            return (<div className={classes.join(" ")} style={this.props.style}>
                        {field}
                        {value}
                    </div>);
        }
        else
            return super.render();
    }
}

FormField.defaultProps = {
    flex: true
};
