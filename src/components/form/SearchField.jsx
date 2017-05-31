import React, { Component } from 'react';
import { Field } from './Field';

/*
    @abstract
*/
export class SearchField extends Field
{
    constructor(props)
    {
        super(props);

        this.baseClass = 'form-field';
    }
    onChange(event)
    {
        super.onChange(event);

        if(event.target.value == "")
            this.onSearch(event);
    }
    onKeyPress(event)
    {
        super.onKeyPress(event);

        if(event.key == 'Enter')
            this.onSearch(event);
    }
    onSearch(event)
    {
        if(this.props.onSearch)
            this.props.onSearch(event);
    }
    render()
    {
        let classes = [this.baseClass, "form-type-" + this.props.type];
        let { className, align, required} = this.props;

        if(className && className.length > 0)
            classes.push(className);

        if(align && align.length > 0)
            classes.push(this.baseClass + '-' + align);

        if(required === true)
            classes.push(this.baseClass + '-required');

        return (<div className={classes.join(" ")} style={this.props.style}>
                {this.props.label? <div className="form-field-label hbox-l"><label>{this.props.label}:</label></div> : null}
                <div className="form-field-value hbox-r">{this.createInput(this.props.type)}</div>
            </div>);
    }
}

SearchField.defaultProps = {
    type: 'search'
};
