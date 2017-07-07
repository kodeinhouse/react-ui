import React, { Component } from 'react';
import { Panel } from '../other/Panel.jsx';
import { Field } from './Field.jsx';
import { FormField } from './FormField';

export class FormPanel extends Panel
{
    constructor(props)
    {
        super(props);

        this.bodyCls = 'x-form-body vbox';

        this.isValid = this.isValid.bind(this);
    }

    isValid(refs)
    {
        let fields = this.getFields(this);
        let name = null;
        
        for (let i = 0; i < fields.length; i++) {
            let name = fields[i].props.name;

            if(name != null)
            {
                let component = refs[name];

                try {

                    if(this.props.debug)
                        console.log(name + ': ' + component.isValid());

                    if(!component.isValid())
                        return false;
                }
                catch (e) {
                    console.log(name);
                    console.log(e);
                }

            }
        }

        return true;
    }

    getValues(refs)
    {
        let fields = this.getFields();
        let values = {}, component = null;

        fields.forEach(function(field){
            component = refs[field.props.name];

            values[field.props.name] = component.getValue();
        });

        return values;
    }

    /**
     * This is another version of the algorithm to get the Field components
     */
    getFormFields(component)
    {
        let components = [];
        let self = this;

        if(component.type != null && component.type.prototype instanceof Field)
            components.push(component);
        else
            if(component.props != null)
            {
                if(Array.isArray(component.props.children))
                {
                    component.props.children.forEach(function(item){
                        components = components.concat(self.getFormFields(item));
                    });
                }
                else
                    if(component.props.children != null)
                        components = this.getFormFields(component.props.children);
            }

        return components;
    }

    getFields()
    {
        var types = ['text', 'checkbox', 'note', 'dropdown', 'display'];

        return this.getComponents(this);
    }

    getComponents(component)
    {
        let components = [];

        if(component.type != null && component.type.prototype instanceof Field)
            return component;
        else
            if(component.props != null && component.props.children)
            {
                let children = component.props.children;

                if(component.props.children.map)
                {
                    let self = this;

                    children.map(function(item){
                        if(item != null)
                            components = components.concat(self.getComponents(item));
                    });

                    return components;
               }
               else
                   return this.getComponents(children);
            }
            else
                return components;
    }
}

FormPanel.defaultProps = {
    type: 'form-panel',
    debug: false
};
